FROM python:latest

WORKDIR /app
COPY requirements.txt ./
RUN python -m pip install -r requirements.txt

COPY  app.py api_requests.py graphs.py ./
COPY data/  ./data/
COPY views/ ./views/

EXPOSE 80

ENTRYPOINT [ "python", "app.py" ]