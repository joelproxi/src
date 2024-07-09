import grpc
from concurrent import futures
import os
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import dfs_pb2
import dfs_pb2_grpc

app = Flask(__name__)

# Directory to store file chunks
# Replace with the actual directory path
CHUNK_STORAGE_DIR = "storage"

# Ensure the directory exists
os.makedirs(CHUNK_STORAGE_DIR, exist_ok=True)


class DFSNode(dfs_pb2_grpc.DFSServicer):
    def StoreChunk(self, request, context):
        file_name = request.file_name
        chunk_index = request.chunk_index
        chunk_data = request.chunk_data

        # Ensure file name is secure
        secure_file_name = secure_filename(file_name)

        # Construct the chunk file path
        chunk_path = os.path.join(CHUNK_STORAGE_DIR, f"{
                                  secure_file_name}_{chunk_index}")

        try:
            with open(chunk_path, 'wb') as chunk_file:
                chunk_file.write(chunk_data)
        except Exception as e:
            return dfs_pb2.StoreChunkResponse(status=f"Error: {str(e)}")

        return dfs_pb2.StoreChunkResponse(status="Chunk stored successfully")

    def RetrieveChunk(self, request, context):
        file_name = request.file_name
        chunk_index = request.chunk_index

        # Ensure file name is secure
        secure_file_name = secure_filename(file_name)

        # Construct the chunk file path
        chunk_path = os.path.join(CHUNK_STORAGE_DIR, f"{
                                  secure_file_name}_{chunk_index}")

        if not os.path.exists(chunk_path):
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Chunk not found')
            return dfs_pb2.RetrieveChunkResponse()

        with open(chunk_path, 'rb') as chunk_file:
            chunk_data = chunk_file.read()

        return dfs_pb2.RetrieveChunkResponse(chunk_data=chunk_data)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    dfs_pb2_grpc.add_DFSServicer_to_server(DFSNode(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
