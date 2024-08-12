document.getElementById('form').onsubmit = e => e.preventDefault();

const searchInput = document.getElementById('search-input');
const results = document.getElementById('results');

const searchMusic = () => {
	const searchTerm = searchInput.value.trim().toLowerCase();
	results.innerHTML = "";

	if (!searchTerm) return;

	const regex = new RegExp(searchTerm.split('').join('.*'), 'i');

	const filteredData = musicArray
		.filter(({
			artist,
			name
		}) => regex.test(artist.toLowerCase()) || regex.test(name.toLowerCase()))
		.sort((a, b) => {
			const score = ({
					artist,
					name
				}) =>
				(regex.test(artist.toLowerCase()) ? 2 : 0) + (regex.test(name.toLowerCase()) ? 1 : 0);
			return score(b) - score(a);
		})
		.slice(0, 9);

	const fragment = document.createDocumentFragment();
	filteredData.forEach((dataItem) => {
		const li = document.createElement('li');
		li.classList.add('searchresult');

		const img = document.createElement('img');
		img.classList.add('list-image');
		img.src = `${ALBUMS_DIR}${dataItem.img}`;

		const span = document.createElement('span');
		span.textContent = `${dataItem.name} - ${dataItem.artist}`;

		const toolTip = document.createElement('span');
		toolTip.classList.add('tooltiptext');
		toolTip.textContent = span.textContent;

		li.append(img, span, toolTip);
		li.title = span.textContent;
		fragment.appendChild(li);

		li.addEventListener('click', () => {
			const index = musicArray.indexOf(dataItem);
			loadMusic(index);
			playMusic();
			mainAudio.play();
			musicIndex = index;
			results.innerHTML = "";
			searchInput.value = "";
			updateQueue();
			isRepeat = !isRepeat;
			document.querySelector(".repeat-image").src = "../assets/images/ui/not-repeat.png";
		});
	});

	results.appendChild(fragment);
};

searchInput.addEventListener('input', searchMusic);