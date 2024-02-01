import math
from sklearn.cluster import DBSCAN, KMeans
from sklearn import preprocessing
from collections import Counter


def density_based_clustering(X, eps=0.5, min_samples=1):
    numeric_data = X.select_dtypes(
        include=['number']).fillna(0)
    min_max_scaler = preprocessing.MinMaxScaler()
    x_scaled = min_max_scaler.fit_transform(numeric_data)
    print(numeric_data.columns)
    # TODO epsilon relativa a distância vetorial máxima entre prontos normalizados entre 0 e 1
    # TODO nomalizar pontos (MinMax scaler)
    # n = len(numeric_data.columns)
    # max_dist = 1.0
    # for _ in range(n):
    #     print(max_dist)
    #     max_dist = (max_dist ** 2 + max_dist ** 2) ** 0.5
    #     # baseado em max_dist criar epsilon
    # eps = max_dist / 100

    db = DBSCAN(eps=0.5, min_samples=10).fit(x_scaled)
    print(Counter(db.labels_))
    return db


music_metadata = [
    "danceability",
    "energy",
    "instrumentalness",
    "key",
    "liveness",
    "loudness",
    "mode",
    "speechiness",
    "tempo",
    "time_signature",
    "valence",
]


def k_means_clustering(X, n_clusters=10):
    numeric_data = X.select_dtypes(
        include=['number']).fillna(0)
    min_max_scaler = preprocessing.MinMaxScaler()
    x_scaled = min_max_scaler.fit_transform(numeric_data)
    kmeans = KMeans(n_clusters=n_clusters, n_init='auto').fit(x_scaled)
    unscaled_centers = min_max_scaler.inverse_transform(
        kmeans.cluster_centers_)
    centers = []
    for label in kmeans.labels_:
        zipped = zip(numeric_data.columns, unscaled_centers[label])
        centers.append({
            metadata: dict(zipped) for metadata in music_metadata
        })
    return kmeans, centers
