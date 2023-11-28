const header = document.querySelector('.header'),
        logo = document.querySelector('.logo'),
        searchIpnut2 = document.querySelector('.search-input')

window.onscroll = () => {

    if (this.scrollY > 50) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }

}

//LS, ENG, AFR
//CAT, PHYSC, MATH?, LO


//All my assignments so far (5) < 75%

//LS - 75% 6
//LO - 80% 7
//CAT - 80% 7
//MATH - 70% 6
//ENG - 70% 6
//AFR - 65% 5
//PHYSC - 70% 6

searchIpnut2.addEventListener('focus', () => {
  document.querySelector('.overlay').style.opacity = 1;
  
})

searchIpnut2.addEventListener('focusout', () => {
  document.querySelector('.overlay').style.opacity = 0;
})

let html = '';
  
  const uniqueNames = new Set();
  const result = [];
  
  while (uniqueNames.size < 5 && result.length < musicArray.length) {
    const randomIndex = Math.floor(Math.random() * musicArray.length);
    const person = musicArray[randomIndex];
  
    if (!uniqueNames.has(person.artist)) {
      uniqueNames.add(person.artist);
      result.push(person);
    }
  }
  
  for (const person of result) {
    html += `<div class="card">
                    <div class="card-upper">
                            <img src="./assets/images/artists/${person.artistImg}" alt="">
                    </div>
                    <div class="card-lower">
                            <p>${person.artist}</p>
                    </div>
            </div>`;
  }

document.getElementById('container').innerHTML = html;

  
/**********************************************************************************************/
/**********************************************************************************************/
/**********************************************************************************************/

