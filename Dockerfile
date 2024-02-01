FROM python:3.13.0a2-alpine3.19

RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY . /app

EXPOSE 80

ENTRYPOINT [ "python app.py" ]