import os
from flask import Flask, request, jsonify, send_file

app = Flask(__name__)


class DFSNode:
    def __init__(self, storage_dire='storage'):
        self.storage_dir = storage_dire
        if not os.path.exists(self.storage_dir):
            os.makedirs(self.storage_dir)

    def store_file(self, file_hash, chunk_index, chunk_data):
        chunk_path = os.path.join(
            self.storage_dir, f'{file_hash}_{chunk_index}')
        with open(chunk_path, 'wb') as chunk_file:
            chunk_file.write(chunk_data)

    def retrieve_file(self, file_hash, chunk_index):
        chunk_path = os.path.join(
            self.storage_dir, f'{file_hash}_{chunk_index}')
        if os.path.exists(chunk_path):
            return open(chunk_path, 'rb')
        return None


dfs_node = DFSNode()


@app.route('/store/', methods=['POST'])
def store_file():
    file = request.files['file']
    file_hash = request.form['file_hash']
    chunk_index = request.form['chunk_data']
    dfs_node.store_file(file_hash, chunk_index, file.stream)
    return jsonify({'status': 'success'}), 200


@app.route('/retrieve/<file_hash>/<int:chunk_index>/', methods=['GET'])
def retrive_file(file_hash, chunk_index):
    chunk_data = dfs_node.retrieve_file(file_hash, chunk_index)
    if chunk_data is None:
        return jsonify({'status': 'file not found'}), 404
    return send_file(chunk_data, minetype='application/octet-stream')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000)
