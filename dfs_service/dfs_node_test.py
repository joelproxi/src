import os
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Directory to store file chunks
CHUNK_STORAGE_DIR = "storage"  # Replace with the actual directory path

# Ensure the directory exists
os.makedirs(CHUNK_STORAGE_DIR, exist_ok=True)


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

    # Ensure file name is secure
    secure_file_name = secure_filename(file_name)

    # Construct the chunk file path
    chunk_path = os.path.join(CHUNK_STORAGE_DIR, f"{
                              secure_file_name}_{chunk_index}")

    try:
        with open(chunk_path, 'wb') as chunk_file:
            chunk_file.write(file.read())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"status": "Chunk stored successfully"}), 200


@app.route('/retrieve/<file_name>/<int:chunk_index>/', methods=['GET'])
def retrieve_file(file_name, chunk_index):
    # Ensure file name is secure
    secure_file_name = secure_filename(file_name)

    # Construct the chunk file path
    chunk_path = os.path.join(CHUNK_STORAGE_DIR, f"{
                              secure_file_name}_{chunk_index}")

    if not os.path.exists(chunk_path):
        return jsonify({"error": "Chunk not found"}), 404

    return send_file(chunk_path, as_attachment=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
