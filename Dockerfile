FROM python

WORKDIR /app
COPY requirements.txt app.py data/ views/ api_requests.py graphs.py /app

RUN python -m pip install -r requirements.txt

EXPOSE 80

ENTRYPOINT [ "python app.py" ]