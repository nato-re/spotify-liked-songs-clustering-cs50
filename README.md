# Project Title: K-means Cluster Playlist Maker

## Video URL
[Link to Video](https://youtu.be/jSWJxH-pe7s)

## Project Description

The K-means Cluster Playlist Maker is a web application that utilizes K-means clustering to group your liked songs on Spotify into distinct clusters. Each cluster represents a playlist, and the songs within a cluster share similar features, allowing you to discover and organize your music in a more meaningful way.

### Features

1. **Authentication**: Users can log in with their Spotify account, granting the application access to their liked songs.

2. **Cluster Generation**: Users can specify the number of clusters they want, and the application uses K-means clustering to group their liked songs accordingly.

3. **Visualization**: The application provides a visual representation of the clusters using K-means graphs.

4. **Playlist Naming**: The application uses OpenAI's GPT-3.5 language model to generate unique playlist names based on the characteristics of each cluster.

5. **Playlist Creation**: Users can choose to create unique playlists based on the generated clusters, helping them organize their music on Spotify.

### Technologies Used

- **Backend**: Python with Flask framework
- **Frontend**: HTML, CSS, JavaScript
- **Data Science**: K-means clustering algorithm, pandas, scikit-learn
- **Spotify API**: Integration for user authentication and access to liked songs
- **OpenAI GPT-3.5 Turbo**: Language model for playlist naming suggestions

### How to Run the Application

1. Clone the repository to your local machine.
2. Install the required Python packages using `pip install -r requirements.txt`.
3. Run the Flask application using `python app.py`.
4. Access the application through a web browser at `http://localhost:8080`.

### Note

Make sure to set up your Spotify API credentials and OpenAI GPT-3.5 Turbo API key before running the application.

Feel free to explore, discover, and organize your Spotify liked songs with the K-means Cluster Playlist Maker!

Be free