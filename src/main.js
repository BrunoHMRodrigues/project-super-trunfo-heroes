import './style.css'

const ulPc = document.querySelector('.ul-pc-cards');
const ulPlayer = document.querySelector('.ul-player-cards');


async function getAHero() {
    const idHero = Math.round((Math.random() * 499) + 1);
    const API = `https://www.superheroapi.com/api.php/5644837492266279/${idHero}`;
    const response = await fetch(API);
    const getHero = await response.json();
    return getHero;
}

// const hero = await getAHero();
// console.log(hero);

async function createCards(player) {
    const arrayHeroes = [];
    for (let index = 0; index < 5; index += 1) {
        const hero = await getAHero();
        const powerstats = hero.powerstats
        const image = hero.image.url;
        const verifyNull = Object.values(hero.powerstats).includes('null');
        if ( verifyNull === true) {
            index -= 1;
        } else {
            const { name } = hero;        
            const { combat, durability, intelligence, power, speed, strength } = powerstats;
            // console.log(image);
            // console.log(name);
            // console.log(combat);
            // console.log(durability);
            // console.log(intelligence);
            // console.log(power);
            // console.log(speed);
            // console.log(strength);
            arrayHeroes.push(hero);

            const newCard = document.createElement('li');
            newCard.classList.add('revealed-card');
            newCard.innerHTML = `<img src="${image}" alt="${name} image" class="hero-image"><h3>${name}</h3><div class="stats"><p>Combat: ${combat}</p><p>Durability: ${durability}</p><p>Intelligence: ${intelligence}</p><p>Power: ${power}</p><p>Speed: ${speed}</p><p>Strength: ${strength}</p></div>`
            if (player === 'pc') {
                ulPc.appendChild(newCard)
            } else {
                ulPlayer.appendChild(newCard);
            }
        }
    }   
}
createCards('pc');
createCards('player');

const playerSelectedCard = document.querySelector('.player-card');
const playerCards = document.querySelector('.ul-player-cards');

function showAllCards() {
    const revealedCards = document.querySelectorAll('.revealed-card');
    revealedCards.forEach((element) => {element.style.display = 'flex'})
}

playerCards.addEventListener('click', (event) => {
    showAllCards();
    if (event.target.parentNode.className === 'revealed-card') {
        playerSelectedCard.innerHTML = event.target.parentNode.innerHTML;
        event.target.parentNode.style.display = 'none'
        playerSelectedCard.style.display = 'flex';
    } else {
        playerSelectedCard.innerHTML = event.target.innerHTML;
        event.target.style.display = 'none'
        playerSelectedCard.style.display = 'flex';
    }
});
