# Spaulify

## Introduction

Spaulify is the ultimate music player, designed to provide a seamless listening experience for users. With a modern user interface and intuitive controls, Spaulify lets you discover new music and enjoy your favorite tracks hassle-free. Check the site out **[here](https://paulkabzz.github.io/spaulify/www.paulfreestyle.co.za/)**


![The music player UI](https://paulkabzz.github.io/spaulify/www.paulfreestyle.co.za/assets/images/ui/hero3.png)


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

```bash
├── ``assets``
│      ├── ``fonts``    
│      ├── ``stylesheets``
│      │        ├──``globals.css``: All styles relating to the actual music player.   
│      │        ├──``home.css``: All styles on the landing page.   
│      │        └── ``styles.css``: Additional styles.
│      ├── ``images``
│      │        ├──``album``: Contains the album covers.
│      │        ├──``artists``: Contains the artist images.     
│      │        └── ``ui``: Contains images for the UI.             
│      └──``songs``: Contains all the music.             
│             
├── ``js``
│      ├──`home.js`: Script for the landing page functionality.
│      ├──`songs.js`: Script containing song data and logic.
│      ├──`script.js`: Script for the player page functionality.
│      ├──`data.js`: Script containing song search data.
│      ├──`search.js`: Script handling search functionality.
│      ├──`volume.js`: Script managing volume control.
│      └──`lyrics.js`: Script for displaying song lyrics.
│
├── ``player``
│      └──``index.html``: The main player html file.
│        
└── ``index.html``: The landing page.
```
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

# Functionality

## script.js

The ``script.js`` file contains JavaScript code responsible for implementing various functionalities in the Spaulify music player application. Below is an explanation of each significant function and its role in the application:

1. **Initialization and Event Listeners:**
    - The script starts by selecting necessary elements from the ``DOM`` and defining variables.
    - Event listeners are attached to handle actions like ``window``, ``load``, ``unload``, ``click`` events on ``play/pause`` buttons, and progress bar interaction.

2. **Window Load Event:**
    - On ``window load``, the script retrieves the song index based on the URL hash or loads the last played song from local storage.
    - The ``loadMusic`` function is then called to initialize the player with the selected song.

3. **Load Music Function:**
    - This function populates the player interface with details of the currently playing song.
    - It sets the song title, artist name, album image, lyrics, and background color based on the album art.
    - The song's source URL is updated, and the current song name is saved to local storage for future reference.

4. **Color Thief Integration:**
    - The script utilizes the ``Color Thief`` library to extract dominant colors from album images and dynamically adjust the background color of the player interface.
    - Depending on the dominant color's brightness, the header and overlay styles are adjusted to ensure readability.
  
5. **Playback Control Functions:**
    - ``playMusic()`` and ``pauseMusic()`` functions toggle the playback state of the music, updating UI elements accordingly.
    - ``prevSong()`` and ``nextSong()`` functions handle navigation to the previous and next songs in the playlist.
  
6. **Time Update Event:**
    - The ``mainAudio.ontimeupdate`` event continuously updates the progress bar and displays the current playback time of the song.
  
7. **Progress Bar Interaction:**
    - Clicking on the progress bar seeks to the specific time of the song, enabling users to jump to desired positions in the track.
  
8. **Search Functionality:**
    - The script implements real-time search functionality, filtering songs based on user input in the search input field.
    - Regular expressions are used to match the search query against song and artist names, providing relevant search results.
    - Matching results are displayed dynamically, and clicking on a search result loads and plays the corresponding song.
  
9. **Local Storage Integration:**

    - The script saves the last played song and its playback time to local storage, allowing users to resume playback from where they left off.
  
These functionalities collectively provide users with a seamless music listening experience, enhanced by dynamic UI updates and intuitive controls.

## search.js

The ``search.js`` script enhances the Spaulify music player application by implementing real-time search functionality, allowing users to filter songs based on their input. Below is an explanation of each part of the script and its role in the search functionality:

1. **Initialization:**
    - The script selects necessary DOM elements such as the search input field (``searchInput``), the results container (``results``), and the form (``form``) to prevent default form submission behavior.
      
2. **Form Submission Prevention:**
    - The ``form.onsubmit`` event prevents the default form submission behavior, ensuring that the search query is handled by the JavaScript functionality without reloading the page.

3. **Search Input Event Listener:**
    - The ``searchInput.oninput`` event listener triggers whenever the user types in the search input field.
    - It retrieves the trimmed and lowercase version of the search term entered by the user.
  
4. **Regular Expression Creation:**
    - A regular expression (``regex``) is dynamically created from the search term to allow for flexible and case-insensitive matching.
    - The search term is split into individual characters and joined with ``.*`` to match any character sequence in between, effectively creating a wildcard search.
  
5. **Data Filtering:**
    - The ``dataArray`` (presumably containing song data) is filtered based on whether the search term matches either the artist's name or the song's name.
    - Songs whose artist or name match the search term are retained in the ``filteredData`` array.
  
6. **Data Sorting:**
    - The ``filteredData`` array is sorted based on the relevance of the search term's match.
    - Songs matching both the artist and name have a higher score, ensuring more relevant results appear at the top of the list.
  
7. **Result Rendering:**
    - For each song in the filtered and sorted ``filteredData`` array, a list item (``li``) is dynamically created.
    - Each list item contains an image, artist and song name, and a tooltip displaying the full artist and song name.
    - The list item is appended to the ``results`` container for display.
  
8. **Result Click Handling:**
    - Event listeners are attached to each list item to handle clicks.
    - When a user clicks on a search result, the corresponding song is loaded, played, and the music index is updated.
    - Additionally, the search results are cleared, and the search input field is reset.
  
9. **Result Clearing:**
    - If the search input field is empty or contains null values, the search results are cleared from the ``results`` container.
  
This script enriches the Spaulify music player application by providing users with an intuitive search feature, allowing them to quickly find and play their desired songs without hassle.

## home.js

The ``home.js`` script enhances the Spaulify landing page by implementing dynamic behavior and interactive features. Below is an explanation of each part of the script and its role in the functionality:

1. **Initialization:**
    - The script selects necessary DOM elements such as the header (``header``), logo (``logo``), and search input (``searchInput2``).

2. **Header Animation on Scroll:**
    - The ``window.onscroll`` event listener triggers whenever the user scrolls.
    - It checks the vertical scroll position (``scrollY``) of the window.
    - If the scroll position is greater than 50 pixels, the ``active`` class is added to the header, making it visible.
    - Otherwise, the ``active`` class is removed, hiding the header.

3. **Search Input Focus and Blur Effects:**
    - Event listeners are attached to the search input (``searchInput2``) for ``focus`` and ``focusout`` events.
    - When the input field is focused, an overlay's opacity is set to 1, providing a visual effect to indicate focus.
    - When the input field loses focus, the overlay's opacity is set back to 0, indicating that the input field is no longer active.

4. **Random Artist Card Generation:**
    - The script generates a set of unique artist cards to display on the landing page.
    - A ``while`` loop runs until the set contains 5 unique artists or until all artists in the ``musicArray`` have been checked.
    - Within the loop, a random index is generated to select a random artist from the ``musicArray``.
    - If the selected artist is not already in the set, it is added to both the set (``uniqueNames``) and the result array (``result``).
    - After obtaining 5 unique artists, a ``for`` loop iterates over the result array to generate HTML for each artist card.
    - Each card consists of an image of the artist and the artist's name.
  
5. **HTML Rendering:**
    - The HTML generated for the artist cards is stored in the ``html`` variable.
    - The content of the container element (``<div id="container">``) is updated with the generated HTML, displaying the artist cards on the landing page.
      
This script enhances the Spaulify landing page by providing dynamic header animation on scroll, focus and blur effects for the search input, and visually appealing random artist cards for user engagement and exploration of available artists.

## Contributing

Contributions to Spaulify are welcomed! Whether you're a developer, designer, or music enthusiast, your input is valuable. Here's how you can contribute:

- **Bug Fixes**: If you encounter any bugs or issues while using Spaulify, please report them by opening an issue on the GitHub repository.

- **Feature Requests**: Have an idea for a new feature or improvement? Share your thoughts by opening a feature request issue on GitHub.

- **Code Contributions**: If you're a developer, you can contribute directly to the codebase by forking the repository, making your changes, and submitting a pull request.

- **Documentation**: Help improve the project's documentation by suggesting edits or additions to the README or inline code comments.

- **Feedback**: Your feedback is valuable! Whether it's about usability, performance, or design, let us know how we can make Spaulify even better.


## Acknowledgements

Spaulify was made possible thanks to the contributions and support of various individuals and resources. I would like to extend my gratitude to:

+ **Color Thief:** For the color extraction library used to dynamically adjust the background color based on album images, enhancing the visual experience of the application.
+ **FontAwesome:** For the icon library used to create intuitive play/pause buttons and other UI elements within the application.
+ **MDN Web Docs:** For offering comprehensive documentation and resources on web development technologies, which were instrumental in implementing various features of Spaulify.
+ **Stack Overflow:** For its vibrant community of developers who generously share their expertise and solutions, aiding in troubleshooting and problem-solving during the development process.
+ **GitHub:** For providing a platform for collaborative development, version control, and open-source sharing, facilitating the growth and accessibility of Spaulify.
  
I am deeply thankful for the valuable contributions and resources that have enriched the development journey of Spaulify.

## License

This project is licensed under the [MIT License](LICENSE).
