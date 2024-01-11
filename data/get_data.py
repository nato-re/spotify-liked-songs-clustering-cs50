import random
import data.treat_data as treat_data
import api_requests as api
import json


def get_fake_songs():
    with open('data/liked_songs.json', 'r') as file:
        data = json.load(file)
    return {song['track']['id']: song for song in data}


def get_fake_songs_stats():
    with open('data/songs_stats.json', 'r') as file:
        data = json.load(file)
    return {song_stat['id']: song_stat for song_stat in data}


def get_fake_artists():
    with open('data/artists.json', 'r') as file:
        data = json.load(file)
    return {artist['id']: artist for artist in data}


def treated_data(token=""):
    if token:
        api.set_token(token)
        liked_songs = api.get_liked()
        artists_ids = set()
        songs_ids = []
        for song_id, song in liked_songs.items():
            artists = song['track']['artists']
            for artist in artists:
                artists_ids.add(artist['id'])
            songs_ids.append(song_id)
        artists = api.get_artists(artists_ids)
        songs_stats = api.get_songs_stats(songs_ids)
    else:
        liked_songs = get_fake_songs()
        songs_stats = get_fake_songs_stats()
        artists = get_fake_artists()
    data = treat_data.clean_join(liked_songs, songs_stats, artists)
    return data


def get_fake_treated_data():
    return treat_data.clean_join(get_fake_songs(), get_fake_songs_stats(), get_fake_artists())

def get_fake_chat_completion(messages=[], model=""):
    class FakeChatCompletionMessage():
        def __init__(self, content) -> None:
            self.content = content
    class FakeChoice():
        def __init__(self, message) -> None:
            self.message = FakeChatCompletionMessage(message)
    class FakeCompletion():
        def __init__(self, choices) -> None:
            self.choices = [FakeChoice(random.random()) for _ in choices]
    return FakeCompletion(messages)
