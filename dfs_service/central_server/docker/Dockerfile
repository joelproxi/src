
FROM python:3.12-slim-bullseye

WORKDIR /app

COPY central_server.py /app/

RUN pip install flask werkzeug

EXPOSE 9000

CMD ["python", "central_server.py"]