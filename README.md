# Spaulify

## Introduction

Spaulify is the ultimate music player, designed to provide a seamless listening experience for users. With a modern user interface and intuitive controls, Spaulify lets you discover new music and enjoy your favorite tracks hassle-free.

## Features

- **Frontend Only**: Spaulify is built entirely using HTML, CSS, and JavaScript on the frontend, ensuring lightweight performance and easy deployment.

- **Modern UI**: The app boasts a sleek and modern user interface, enhancing the overall user experience.

- **Dynamic Backgrounds**: Utilizes Color Thief to dynamically change the background color according to the album image, adding visual appeal to the interface.

- **Volume and Music Controls**: Provides easy-to-use volume and music controls for seamless playback customization.

- **Local Storage Integration**: The app saves the last played song and its playback time to local storage, allowing users to resume their music sessions seamlessly.

- **Search Functionality**: Implements regular expressions (regex) to create a robust search functionality, allowing users to filter the music library based on song name and artist.

## Roadmap

- **Full Stack Integration**: Future plans include transitioning the app to a full-stack architecture using technologies like Next.js, enabling server-side rendering and enhanced performance.

- **Authentication and Validation**: Intending to implement full authentication and validation features to ensure secure user interactions and data integrity.

## Folder Structure

- `assets`: Contains all static assets such as images and stylesheets.
  - `images`: Stores UI elements and album covers.
  - `stylesheets`: Holds CSS files for styling the application.

- `js`: Houses JavaScript files responsible for various functionalities.
  - `home.js`: Script for the landing page functionality.
  - `songs.js`: Script containing song data and logic.
  - `script.js`: Script for the player page functionality.
  - `data.js`: Script containing data manipulation functions.
  - `search.js`: Script handling search functionality.
  - `volume.js`: Script managing volume control.
  - `lyrics.js`: Script for displaying song lyrics.

## Usage

1. **Landing Page**: The landing page introduces users to Spaulify and provides a navigation link to the player page.
   
2. **Player Page**: Navigate to the player page to access the music player interface, where you can control playback, search for songs, and view lyrics.

3. **Search Functionality**: Use the search input to filter songs based on song name or artist, with the top 10 matching results displayed.

4. **Music Controls**: Enjoy seamless music playback with intuitive controls such as play/pause, next/previous track, and volume adjustment.

## Contributing

Contributions are welcome! If you'd like to contribute to Spaulify, feel free to submit pull requests or open issues on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
