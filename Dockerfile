FROM python

WORKDIR /app
COPY . /app

RUN python -m pip install -r requirements.txt

EXPOSE 80

ENTRYPOINT [ "python app.py" ]