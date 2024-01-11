import logging as log
from logging import debug
from flask import Flask, render_template, request, jsonify
import data.get_data as get_data
import api_requests as api
import data.treat_data as treat_data
import graphs
import model
from requests import exceptions
import traceback
import os

app = Flask(__name__)  # Cria a instância da aplicação

app.static_folder = "views/static"
app.template_folder = "views/templates"
global figure
global record_data


@app.route("/")
def main():
    return render_template('index.html.j2')


@app.route("/logged")
def get_token_from_client():
    return render_template('main/index.html.j2')

@app.route("/playlist", methods=['POST'])
def generate_fake():
    auth_token = request.headers.get('Authorization')
    api.set_token(auth_token)
    api.create_playlist(request.json)
    return "", 201

@app.route("/generate")
def generate():
    try:
        auth_token = request.headers.get('Authorization')
        number_of_clusters = request.args.get('clusters')
        if not number_of_clusters.isdigit():
            number_of_clusters = 10
        if not auth_token:
            return render_template('main', error='DEU RUIM')
        df = get_data.treated_data(
            auth_token
            )
        kmeans, centers = model.k_means_clustering(df, int(number_of_clusters))
        fig = graphs.create_figure(df, kmeans, graphs.draw_k_means, "K-Means Graph")
        clusters_record = treat_data.group_songs_by_cluster(df, kmeans, centers)
        records_with_playlists_names = api.add_playlists_names(clusters_record)
        return jsonify(data=records_with_playlists_names, figure=fig)
    except exceptions.HTTPError as err:
        print(err.response.json())
        return jsonify(err.response.json()), err.response.status_code
    except Exception as e:
        print(traceback.format_exc())
        #log_error(str(e))        
        return jsonify(error=str(e)), 500


# @app.route("/graph")
# def graph():


if __name__ == '__main__':
    # debug = True, reinicia automaticamente a cada mudança de arquivo
    # mude a porta, caso ela estiver em uso
    app.run(
        debug=True, 
        host='0.0.0.0', port=8080)
