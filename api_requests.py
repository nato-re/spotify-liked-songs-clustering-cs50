import json
from typing import List
import requests as req
import data.get_data as get_data
from requests.adapters import HTTPAdapter
from urllib3.util import Retry
import os
from openai import OpenAI, types as ty
from dotenv import load_dotenv

load_dotenv()

chat_token = os.getenv('CHAT_KEY')
client = OpenAI(
    api_key=chat_token,
)

# Define the retry strategy
retry_strategy = Retry(
    total=4,  # Maximum number of retries
    # HTTP status codes to retry on
    status_forcelist=[429, 500, 502, 503, 504],
)
# Create an HTTP adapter with the retry strategy and mount it to session
adapter = HTTPAdapter(max_retries=retry_strategy)
# Create a new session object
session = req.Session()
session.mount('http://', adapter)
session.mount('https://', adapter)

req_headers = {
    'Authorization': ""
}


def set_token(token):
    req_headers['Authorization'] = f'Bearer {token}'


def get_liked():
    songs = {}
    response = session.get(
        'https://api.spotify.com/v1/me/tracks?limit=50', headers=req_headers)
    response.raise_for_status()
    if response.status_code == 200:
        data = response.json()
        [songs.update({song['track']['id']: song}) for song in data['items']]
        i = 0
        # while data['next']:
        #     print(f'getting liked songs {i * 50} - {(i + 1) * 50}')
        #     i += 1
        #     response = session.get(data['next'], headers=req_headers)
        #     if response.status_code == 200:
        #         data = response.json()
        #         [songs.update({song['track']['id']: song})
        #          for song in data['items']]
        #     else:
        #         print(response.content)
    return songs


def get_songs_stats(ids: List[str]):
    songs = {}
    ids_len = len(ids)
    max_id_per_request = 100
    for i in range(0, ids_len, max_id_per_request):
        end = i + \
            max_id_per_request if (
                i + max_id_per_request) < ids_len else ids_len - 1
        print(f'getting songs stats {i} - {end}')
        param = ",".join(ids[i:end])
        response = session.get(
            f'https://api.spotify.com/v1/audio-features?ids={param}', headers=req_headers)
        if response.status_code == 200:
            data = response.json()
            for song in data['audio_features']:
                songs[song['id']] = song
    return songs


def get_artists(ids: set):
    artists = {}
    unique_ids = list(ids)
    ids_len = len(unique_ids)
    max_id_per_request = 50
    for i in range(0, ids_len, max_id_per_request):
        end = i + \
            max_id_per_request if (
                i + max_id_per_request) < ids_len else ids_len - 1
        print(f'getting artists {i} - {end}')
        param = ",".join(unique_ids[i:end])
        response = session.get(
            f'https://api.spotify.com/v1/artists?ids={param}', headers=req_headers)
        if response.status_code == 200:
            data = response.json()
            for artist in data['artists']:
                artists[artist['id']] = artist
    return artists

def add_playlists_names(data):
    playlist_quantity = len(data)
    prompt = f"Create {playlist_quantity} unique playlist names based in the following spotify metadata, in JSON format, on the next lines, give only the playlists names separated by line breaks in your response\n"
    for cluster in data:
        prompt += json.dumps(cluster["center"])
    messages = [{ "content": prompt , "role": "user"}]
    
    response = client.chat.completions.create(messages=messages, model="gpt-3.5-turbo-1106") # get_data.get_fake_chat_completion(messages=messages, model="gpt-3.5-turbo-1106") #
    print(response.choices)
    print(response.choices[0])
    choices = response.choices[0].message.content.split("\n")
    playlists = [
        {
            'name': choice,
            'musics': data[index]['musics']
        }
        for index, choice in enumerate(choices)
    ]
    print([name for name in playlists])

    return playlists

def create_playlist(body):
    song_ids = body.get('song_ids')
    playlist_name = body.get('playlist_name')
    user = session.get("https://api.spotify.com/v1/me", headers=req_headers)
    user_id = user.json()['id']
    response = session.post(
        f'https://api.spotify.com/v1/users/{user_id}/playlists', headers=req_headers, 
        json={ 
              "name": playlist_name, 
                "description": "My description", 
                "public": False
            })
    body = response.json()
    print(body)
    playlist_id = body['id']
    #max 100
    song_ids_to_uri = [f"spotify:track:{id}" for id in song_ids]
    while len(song_ids_to_uri) > 0:
        uris = song_ids_to_uri[:100]
        session.post(f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks', data={"uris": uris})
        song_ids_to_uri = song_ids_to_uri[100:]
    return playlist_id
