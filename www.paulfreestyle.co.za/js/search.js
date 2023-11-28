const searchIpnut = document.getElementById('search-input');
const results = document.getElementById('results');
const form = document.getElementById('form');

form.onsubmit = e => e.preventDefault();

searchIpnut.oninput = () => {
    const searchTerm = searchIpnut.value.trim().toLowerCase();
    results.innerHTML = "";

    // Create a regular expression from the search term
    const regex = new RegExp(searchTerm.split('').join('.*'), 'i');

    // Filter the array according to the search input
    const filteredData = dataArray.filter(data => {
        return regex.test(data.artist.toLowerCase()) || regex.test(data.name.toLocaleLowerCase());
        
        
    });

    // Sort the data according to the song name property in ascending order
    filteredData.sort((a, b) => {
        let aScore = 0,
            bScore = 0;
        if (regex.test(a.artist.toLowerCase())) aScore = 2;
        if (regex.test(b.artist.toLowerCase())) bScore = 2;
        if (regex.test(a.name.toLowerCase())) aScore = 1;
        if (regex.test(b.name.toLowerCase())) bScore = 1;

        return bScore - aScore;
    });

    //Black Noir

    // Return the ten most matching items
    filteredData.slice(0, 10).forEach((dataItem) => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let img = document.createElement('img');
        let toolTip = document.createElement('span');
            toolTip.classList.add('tooltiptext');

        img.classList.add('list-image');
        img.src = ALBUMS_DIR + dataItem.img;

        span.textContent = `${dataItem.artist} - ${dataItem.name}`;
        li.classList.add('searchresult');

        toolTip.textContent = span.textContent;

        li.title = span.textContent;

        results.append(li);
        li.append(img);
        li.append(span);
        li.append(toolTip);


        if (searchIpnut.value === "" || searchIpnut.value === null || searchIpnut.value.length < 1) results.innerHTML = "";

        li.addEventListener('click', () => {
            loadMusic(dataArray.indexOf(dataItem));
            playMusic();
            mainAudio.play();
            musicIndex = dataArray.indexOf(dataItem);
            results.innerHTML = "";
            searchIpnut.value = "";
        });
    });
};
