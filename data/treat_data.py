import itertools

import pandas as pd

columns = [
    'track.album.album_type',
    'track.album.available_markets',
    'track.album.external_urls.spotify',
    'track.album.href',
    # 'track.album.id',
    'track.album.images',
    'track.album.release_date_precision',
    'track.album.uri',
    'track.artists',
    'track.available_markets',
    'track.disc_number',
    'track.duration_ms',
    'track.explicit',
    'track.external_ids.isrc',
    'track.external_urls.spotify',
    'track.href',
    # 'track.id',
    'track.is_local',
    'track.name',
    # 'track.popularity',
    'track.preview_url',
    'track.track_number',
    'track.type',
    'track.uri'
]

def clean_join(songs, stats, artists):
    genres = [value['genres'] for value in artists.values()]
    unique_genres = list(set(itertools.chain.from_iterable(genres)))
    data = []
    for song_id, song in songs.items():
        genres = {}
        if songs.get(song_id) and stats.get(song_id):
            for artist in song['track']['artists']:
                artist_genres = artists.get(artist['id'], {}).get('genres', [])
                for genre in unique_genres:
                    genres[genre] = True if genre in artist_genres else False
            song_row = {
                'id': song['track']['id'],
                'name': song['track']['name'],
                'artists': [artist['name'] for artist in song['track']['artists']],
                **stats[song_id],
                **genres,
            }
            data.append(song_row)
    df = pd.DataFrame(data)
    return df
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
def group_songs_by_cluster(df, kmeans, centers):
    labels = kmeans.labels_
    clusters_series = pd.Series(labels, name='cluster')
    df.insert(value=clusters_series, column='cluster', loc=0)
    clusters_values = df['cluster'].unique()
    clusters_list = []
    for cluster in clusters_values:
        sub_set = df.loc[df['cluster'] == cluster]
        sub_set = sub_set[['name', 'artists', "id"]]
        clusters_list.append(
            { 
                "musics": sub_set.to_dict(orient='records'), 
                "center": centers[cluster]                    
            }
        )
    return clusters_list
