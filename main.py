import data.get_data as get_data
import matplotlib.pyplot as plt
import api_requests as api
import graphs
import model
import data.treat_data as treat_data
import pandas as pd
import numpy as np
import pickle
import os

def generate(df):
    kmeans, clusters_centers = model.k_means_clustering(df)
#    pickle.dumps(df, os.open('data/df.pk', 'w'))
#    pickle.dumps(df, os.open('data/df.pk', 'w') )
    graphs.draw_k_means(df, kmeans, plt)
    data = treat_data.group_songs_by_cluster(df, kmeans)
    clusters_with_playlists_names = api.add_playlists_names(data, clusters_centers)
    return clusters_with_playlists_names



if __name__ == '__main__':
    generate(get_data.treated_data())
