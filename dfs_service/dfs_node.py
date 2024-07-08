import os


class DFSNode:
    def __init__(self, storage_dire='storage'):
        self.storage_dir = storage_dire
        if not os.path.exists(self.storage_dir):
            os.makedirs(self.storage_dir)

    def sanitize_input(self, input_str):
        return input_str.replace('\x00', '')

    def store_file(self, file_hash, chunk_index, chunk_data):
        chunk_path = os.path.join(
            self.storage_dir, f'{file_hash}_{chunk_index}')
        with open(chunk_path, 'wb') as chunk_file:
            chunk_file.write(chunk_data)

    def retrieve_file(self, file_hash, chunk_index):
        chunk_path = os.path.join(
            self.storage_dir, f'{file_hash}_{chunk_index}')
        if os.path.exists(chunk_path):
            print("chunk exists")
            return open(chunk_path, 'rb')
        print("chunk not")
        return None
