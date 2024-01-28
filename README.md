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
## Usage

1. **Landing Page**: The landing page introduces users to Spaulify and provides a navigation link to the player page.
   
2. **Player Page**: Navigate to the player page to access the music player interface, where you can control playback, search for songs, and view lyrics.

3. **Search Functionality**:

    - **Search Input Field**: Utilize the search input field located in the player page interface.
    
    - **Real-Time Filtering**: As you type your search query, the application dynamically filters through the music library to display matching results in real-time.
    
    - **Regular Expression Matching**: Spaulify utilizes regular expressions to match the search query against both song names and artist names, ensuring comprehensive search results.
    
    - **Top Matching Results**: The application displays the top ten matching results based on the search query, providing you with relevant options to choose from.
    
    - **Interactive Results**: Each search result displayed includes the artist name, song name, and album image. Click on a search result to load and play the corresponding song.
    
    - **Instant Playback**: When you click on a search result, Spaulify immediately loads and plays the selected song, offering a seamless music playback experience.
    
    - **Clearing Search Results**: If the search input field is cleared or contains fewer than one character, the search results are cleared from the interface.

4. **Music Controls**: Enjoy seamless music playback with intuitive controls such as play/pause, next/previous track, and volume adjustment.

5. **Volume Control**: Adjust the volume level using the volume control slider located in the player interface.

6. **Lyrics Display**: View the lyrics of the currently playing song directly in the player interface for an enhanced listening experience.

7. **Local Storage Integration**: Spaulify saves the last played song and its playback time to local storage, allowing you to resume your music sessions seamlessly.

8. **Responsive Design**: Access Spaulify from any device or screen size, thanks to its responsive design that adapts to different viewing environments.

Explore the various features and functionalities of Spaulify to enjoy an immersive and personalized music listening experience.

## Contributing

Contributions to Spaulify are welcomed! Whether you're a developer, designer, or music enthusiast, your input is valuable. Here's how you can contribute:

- **Bug Fixes**: If you encounter any bugs or issues while using Spaulify, please report them by opening an issue on the GitHub repository.

- **Feature Requests**: Have an idea for a new feature or improvement? Share your thoughts by opening a feature request issue on GitHub.

- **Code Contributions**: If you're a developer, you can contribute directly to the codebase by forking the repository, making your changes, and submitting a pull request.

- **Documentation**: Help improve the project's documentation by suggesting edits or additions to the README or inline code comments.

- **Feedback**: Your feedback is valuable! Whether it's about usability, performance, or design, let us know how we can make Spaulify even better.

## License

This project is licensed under the [MIT License](LICENSE).
