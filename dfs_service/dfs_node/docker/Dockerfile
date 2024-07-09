
FROM python:3.12-slim-bullseye

WORKDIR /app

COPY dfs_node.py /app/
RUN pip install flask werkzeug

EXPOSE 9001

CMD ["python", "dfs_node.py"]

# docker build -t dfs-node:latest -f Dockerfile.node .
# docker build -t central-server:latest -f Dockerfile.server .