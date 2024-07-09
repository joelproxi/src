import grpc
import dfs_pb2
import dfs_pb2_grpc

# Fonctions utilitaires et autres implémentations...


def store_chunk(stub, file_name, chunk_index, chunk_data):
    request = dfs_pb2.StoreChunkRequest(
        file_name=file_name,
        chunk_index=chunk_index,
        chunk_data=chunk_data
    )
    response = stub.StoreChunk(request)
    print(response.status)


def retrieve_chunk(stub, file_name, chunk_index):
    request = dfs_pb2.RetrieveChunkRequest(
        file_name=file_name,
        chunk_index=chunk_index
    )
    response = stub.RetrieveChunk(request)
    if response.chunk_data:
        return response.chunk_data
    else:
        print("Chunk not found")

# Fonction principale (run)...
