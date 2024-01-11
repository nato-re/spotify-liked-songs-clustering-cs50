import base64
from io import BytesIO

import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.figure import Figure

from sklearn.decomposition import PCA
import numpy as np
from sklearn.cluster import DBSCAN

from sklearn.preprocessing import StandardScaler

import data.get_data as get_data
import model

def draw(data, db, picture):
    # TODO epsilon relativa a distância vetorial máxima entre prontos normalizados entre 0 e 1
    # TODO nomalizar pontos (MinMax scaler)
    core_samples_mask = np.zeros_like(db.labels_, dtype=bool)
    core_samples_mask[db.core_sample_indices_] = True
    labels = db.labels_
    print(labels)
    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)
    n_noise_ = list(labels).count(-1)

    print('Estimated number of clusters: %d' % n_clusters_)
    print('Estimated number of noise points: %d' % n_noise_)
    unique_labels = set(labels)
    colors = [plt.cm.Spectral(each)
              for each in np.linspace(0, 1, len(unique_labels))]
    numeric_data = data.drop(['name', 'id'], axis=1).select_dtypes(
        include=['number']).fillna(0)
    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(numeric_data)

    # Create a new DataFrame with the reduced dimensions
    df_pca = pd.DataFrame(data=X_pca, columns=['PC1', 'PC2'])
    for k, col in zip(unique_labels, colors):
        if k == -1:
            # Black used for noise.
            col = [0, 0, 0, 1]

        class_member_mask = (labels == k)

        xy = X_pca[class_member_mask & core_samples_mask]
        picture.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=tuple(col),
                     markeredgecolor='k', markersize=4)

        xy = X_pca[class_member_mask & ~core_samples_mask]
        picture.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=tuple(col),
                     markeredgecolor='k', markersize=2)
    picture.show()


def draw_k_means(data, db, picture):
    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(data.select_dtypes(
        include=['number']).fillna(0))
    X_std = StandardScaler().fit_transform(X_pca)
    labels = db.labels_
    unique_labels = set(labels)
    colors = [plt.cm.Spectral(each)
              for each in np.linspace(0, 1, len(unique_labels))]
    data_color_mapper = [colors[label] for label in labels]

    # Create a new DataFrame with the reduced dimensions
    df_pca = pd.DataFrame(data=X_std, columns=['PC1', 'PC2'])
    picture.scatter(df_pca['PC1'], df_pca['PC2'], c=data_color_mapper)



def create_figure(data, db, callback, title):
    fig = Figure()
    ax = fig.subplots()

    callback(data, db, ax)
    ax.set_title(title)
    ax.set_xlabel('Principal Component 1')
    ax.set_ylabel('Principal Component 2')
    buf = BytesIO()
    fig.savefig(buf, format="png")
    # Embed the result in the html output.
    result = base64.b64encode(buf.getbuffer()).decode("ascii")
    return f'<img class="graph" src="data:image/png;base64,{result}"/>'


def create_plot(data, db, callback, title):
    callback(data, db, plt)
    plt.show()


if __name__ == '__main__':
    data = get_data.treated_data()
    clustered = model.k_means_clustering(data)
    draw_k_means(clustered, data)
