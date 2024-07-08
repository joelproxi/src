from flask import Flask, request, jsonify, Response
import requests
import random

app = Flask(__name__)

# List of DFS nodes
DFS_NODES = [
    'http://192.168.1.158:5001',
    'http://192.168.1.158:5002',
    # 'http://node3:5000'
    # Add more nodes as needed
]


@app.route('/store/', methods=['POST'])
def store_file():
    file = request.files.get('file')
    file_name = request.form.get('file_name')
    chunk_index = request.form.get('chunk_index')
    total_chunks = request.form.get('total_chunks')

    if not all([file, file_name, total_chunks]):
        return jsonify({"error": "Missing fields"}), 400

    try:
        total_chunks = int(total_chunks)
    except ValueError:
        return jsonify({"error": "Total chunks must be an integer"}), 400

    responses = []
    for chunk_index in range(total_chunks):
        # Randomly select a node to store each chunk
        node_url = random.choice(DFS_NODES)

        response = requests.post(
            f'{node_url}/store/',
            files={'file': file},
            data={'file_name': file_name, 'chunk_index': chunk_index}
        )

        if response.status_code != 200:
            return jsonify({"error": f"Error storing chunk {chunk_index} at {node_url}"}), 500

        responses.append(response.json())

    return jsonify({"status": "File stored successfully", "responses": responses}), 200


@app.route('/retrieve/<file_name>/<total_chunks>/', methods=['GET'])
def retrieve_file(file_name, total_chunks):
    # total_chunks = request.args.get('total_chunks')
    total_chunks = int(total_chunks)
    chunk_data_list = []
    print("hello")
    for chunk_index in range(total_chunks):
        # Randomly select a node to retrieve each chunk
        node_url = random.choice(DFS_NODES)

        response = requests.get(
            f'{node_url}/retrieve/{file_name}/{chunk_index}/')

        if response.status_code != 200:
            return jsonify({"error": f"Error retrieving chunk {chunk_index} from {node_url}"}), 500

        chunk_data_list.append(response.content)

    def iterate_over_chunks():
        for chunk in chunk_data_list:
            yield chunk

    return Response(iterate_over_chunks(), content_type='application/octet-stream')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9001)
