'use strict';

const cardChoices = [
  '😀', '🥸', '🤡', '👽', '😹', '👻',
  '🐢', '🌍', '🦴', '🚀', '😎', '🤖',
  '☠️', '🧟', '👑', '👼🏾', '🦕', '🌈',
];

shuffle(cardChoices);

const cardsUsed = cardChoices.slice(0, 6);
const deck = [...cardsUsed, ...cardsUsed, ...cardsUsed, ...cardsUsed];
shuffle(deck);

const plays = Array(2).fill(null);
let score = 0;

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
  card.dataset.index = index;
});

document.querySelector('.board').addEventListener('click', e => {
  if (e.target.classList.contains('card')) {
    play(parseInt(e.target.dataset.index));
  };
});

document.querySelector('.play-again').addEventListener('click', e => {
  window.location.reload();
});

const scoreDisplay = document.querySelector('.score');

function shuffle(cards) {
  cards.sort(() => Math.random() - 0.5);
}

function play(index) {
  if (cards.item(index).textContent) return;

  if (plays[0] === null) {
    plays[0] = index
    revealCard(index);
  } else if (plays[1] === null) {
    plays[1] = index
    revealCard(index);
    handlePlays();
  }
}

function revealCard(index) {
  cards.item(index).textContent = deck[index];
}

function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function handlePlays() {
  if (deck[plays[0]] === deck[plays[1]]) {
    score += 10;
  } else {
    await sleep(1000);
    cards.item(plays[0]).textContent = '';
    cards.item(plays[1]).textContent = '';
    score -= 2;
  }
  plays.fill(null);
  scoreDisplay.textContent = `${score} point${score !== 1 && 's'}`;
}
