# dfs_server.py
from flask import Flask, request, jsonify, send_file
import os

app = Flask(__name__)

# Directory to store file chunks
CHUNK_STORAGE_DIR = "storage"  # Replace with the actual directory path

# Ensure the directory exists
os.makedirs(CHUNK_STORAGE_DIR, exist_ok=True)

# Metadata store
metadata = {}


@app.route('/prepare/', methods=['POST'])
def prepare():
    transaction_id = request.form.get('transaction_id')
    file_name = request.form.get('file_name')
    chunk_index = request.form.get('chunk_index')
    chunk_data = request.files.get('chunk_data')

    if not all([transaction_id, file_name, chunk_index, chunk_data]):
        return jsonify({"success": False, "message": "Missing fields"}), 400

    try:
        chunk_index = int(chunk_index)
    except ValueError:
        return jsonify({"success": False, "message": "Chunk index must be an integer"}), 400

    chunk_path = os.path.join(CHUNK_STORAGE_DIR, f"{
                              file_name}_{chunk_index}.tmp")

    try:
        with open(chunk_path, 'wb') as chunk_file:
            chunk_file.write(chunk_data.read())
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

    # Store metadata
    metadata[transaction_id] = chunk_path

    return jsonify({"success": True}), 200


@app.route('/commit/', methods=['POST'])
def commit():
    transaction_id = request.form.get('transaction_id')

    if not transaction_id or transaction_id not in metadata:
        return jsonify({"success": False, "message": "Transaction not found"}), 400

    chunk_path = metadata.pop(transaction_id)
    final_path = chunk_path.replace('.tmp', '')

    os.rename(chunk_path, final_path)

    return jsonify({"success": True}), 200


@app.route('/abort/', methods=['POST'])
def abort():
    transaction_id = request.form.get('transaction_id')

    if not transaction_id or transaction_id not in metadata:
        return jsonify({"success": False, "message": "Transaction not found"}), 400

    chunk_path = metadata.pop(transaction_id)

    os.remove(chunk_path)

    return jsonify({"success": True}), 200


@app.route('/retrieve/<file_name>/<int:chunk_index>/', methods=['GET'])
def retrieve(file_name, chunk_index):
    chunk_path = os.path.join(CHUNK_STORAGE_DIR, f"{file_name}_{chunk_index}")

    if not os.path.exists(chunk_path):
        return jsonify({"error": "Chunk not found"}), 404

    return send_file(chunk_path, as_attachment=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9001)
