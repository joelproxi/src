import grpc
import dfs_pb2
import dfs_pb2_grpc
from concurrent import futures
from flask import Flask, request, jsonify, Response
import requests
import random

app = Flask(__name__)

# List of DFS node addresses
DFS_NODES = ["localhost:50051"]
# DFS_NODES = ["localhost:50051", "localhost:50052", "localhost:50053"]

# Metadata to store information about file chunks
metadata = {}


@app.route('/store/', methods=['POST'])
def store_file():
    file = request.files.get('file')
    file_name = request.form.get('file_name')
    chunk_index = request.form.get('chunk_index')

    if not all([file, file_name, chunk_index]):
        return jsonify({"error": "Missing fields"}), 400

    try:
        chunk_index = int(chunk_index)
    except ValueError:
        return jsonify({"error": "Chunk index must be an integer"}), 400

    # Choose a DFS node randomly
    node_address = random.choice(DFS_NODES)

    # Store metadata
    if file_name not in metadata:
        metadata[file_name] = {}
    if chunk_index not in metadata[file_name]:
        metadata[file_name][chunk_index] = []
    metadata[file_name][chunk_index].append(node_address)

    # Create a gRPC channel and stub
    channel = grpc.insecure_channel(node_address)
    stub = dfs_pb2_grpc.DFSStub(channel)

    # Call the StoreChunk method
    response = stub.StoreChunk(dfs_pb2.StoreChunkRequest(
        file_name=file_name,
        chunk_index=chunk_index,
        chunk_data=file.read()
    ))

    return jsonify({"status": response.status}), 200


@app.route('/retrieve/<file_name>/', methods=['GET'])
def retrieve_file(file_name):
    if file_name not in metadata:
        return jsonify({"error": "File not found in metadata"}), 404

    total_chunks = len(metadata[file_name])
    chunk_data_list = []

    for chunk_index in range(total_chunks):
        nodes = metadata[file_name][chunk_index]
        for node_address in nodes:
            # Create a gRPC channel and stub
            channel = grpc.insecure_channel(node_address)
            stub = dfs_pb2_grpc.DFSStub(channel)

            # Call the RetrieveChunk method
            response = stub.RetrieveChunk(dfs_pb2.RetrieveChunkRequest(
                file_name=file_name,
                chunk_index=chunk_index
            ))

            if response:
                chunk_data_list.append(response.chunk_data)
                break
        else:
            return jsonify({"error": f"Error retrieving chunk {chunk_index} from all nodes"}), 500

    def iterate_over_chunks():
        for chunk in chunk_data_list:
            yield chunk

    return Response(iterate_over_chunks(), content_type='application/octet-stream')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9002)
