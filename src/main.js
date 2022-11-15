import './style.css'

const ulPc = document.querySelector('.ul-pc-cards');
const playerSelectedCard = document.querySelector('.player-card');
const pcSelectedCard = document.querySelector('.pc-card');
const ulPlayerCards = document.querySelector('.ul-player-cards');
const statPlay = document.querySelector('.container-stat-choice');
const playerStatValue = document.querySelector('.player-stat-value');
const pcStatValue = document.querySelector('.pc-stat-value');
const pcPontuation = document.querySelector('.container-pc-pontuation');
const playerPontuation = document.querySelector('.container-player-pontuation');

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
            // arrayHeroes.push(hero);

            const newCard = document.createElement('li');
            
            newCard.innerHTML = `<img src="${image}" alt="${name} image" class="hero-image"><h3>${name}</h3><div class="stats"><p class="stat">Combat: ${combat}</p><p class="stat">Durability: ${durability}</p><p class="stat">Intelligence: ${intelligence}</p><p class="stat">Power: ${power}</p><p class="stat">Speed: ${speed}</p><p class="stat">Strength: ${strength}</p></div>`;
            if (player === 'pc') {
                newCard.classList.add('hidden-card');
                ulPc.appendChild(newCard)
            } else {
                newCard.classList.add('revealed-card');
                ulPlayerCards.appendChild(newCard);
            }
        }
    }   
}

const btnNewGame = document.querySelector('.btn-new-game');

function clean() {
    ulPc.innerHTML = '';
    pcSelectedCard.innerHTML = '';
    pcSelectedCard.style.display = 'none';
    ulPlayerCards.innerHTML = '';
    playerSelectedCard.innerHTML = '';
    playerSelectedCard.style.display = 'none';
    statPlay.innerHTML = '';
    pcStatValue.innerHTML = '';
    playerStatValue.innerHTML = '';
    pcPontuation.innerHTML = `${0}<p class="point-text">Points</p>`;
    playerPontuation.innerHTML = `${0}<p class="point-text">Points</p>`;
}

btnNewGame.addEventListener('click', () => {
    clean();
    createCards('pc');
    createCards('player');
})

const btnPlay = document.querySelector('.btn-play');

btnPlay.addEventListener('click', () => {
    if (statPlay.innerHTML !== '' && playerStatValue !== '') {

    } else {
        alert('Necessário selecionar um stat.');
    }
})

function showAllCards() {
    const revealedCards = document.querySelectorAll('.revealed-card');
    revealedCards.forEach((element) => {element.style.display = 'flex'})
}

ulPlayerCards.addEventListener('click', (event) => {
    showAllCards();
    if (event.target.parentNode.className === 'revealed-card') {
        playerSelectedCard.innerHTML = event.target.parentNode.innerHTML;
        event.target.parentNode.style.display = 'none'
        playerSelectedCard.style.display = 'flex';
    } else if (event.target.parentNode.className === 'stats') {
        playerSelectedCard.innerHTML = event.target.parentNode.parentNode.innerHTML;
        event.target.parentNode.parentNode.style.display = 'none'
        playerSelectedCard.style.display = 'flex';
    } else {
        playerSelectedCard.innerHTML = event.target.innerHTML;
        event.target.style.display = 'none'
        playerSelectedCard.style.display = 'flex';
    }
});

const pcPlayedCard = document.querySelector('.pc-played-card');
const playerPlayedCard = document.querySelector('.player-played-card .player-card');
// const playerStats = document.querySelector('.player-played-card .player-card .stats')

playerPlayedCard.addEventListener('click', (event) => {
    const getStat = event.target;
    const getStatClass = getStat.className;
    console.log(getStat.innerText);
    if (getStatClass === 'stat') {
        const choosedStat = getStat.innerText.slice(0,getStat.innerText.indexOf(':'))
        const statValue = getStat.innerText.replace(/\D/g, '');
        statPlay.innerText = choosedStat;
        playerStatValue.innerText = statValue;
    }
})
