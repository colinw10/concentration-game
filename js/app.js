const MAX_GUESSES = 10;

let cards;
let firstCardIdx;
let secondCardIdx;
let canFlip;
let matchedIndices = [];
let guessCount = 0;
let mismatchedIndices = [];

const boardEl = document.getElementById('board');
const resetBtn = document.getElementById('reset');
const startBtn = document.getElementById('start');
const rulesSection = document.getElementById('rules');
const gameSection = document.getElementById('game');
const guessCountEl = document.getElementById('guess-count');
const messageEl = document.getElementById('message');
const boardContainer = document.getElementById('board-container');

function init() {
  cards = [
    'dolphin.png', 'dolphin.png',
    'shark.png', 'shark.png',
    'jellyfish.png', 'jellyfish.png',
    'clownfish.png', 'clownfish.png',
    'bluetang.png', 'bluetang.png',
    'seaturtle.png', 'seaturtle.png'
  ];
  shuffleCards();

  firstCardIdx = null;
  secondCardIdx = null;
  canFlip = true;
  matchedIndices = [];
  mismatchedIndices = [];
  guessCount = 0;
  guessCountEl.textContent = guessCount;
  messageEl.textContent = '';

  boardContainer.classList.remove('win', 'lose');

  render();
}

function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

function handleCardClick(idx) {
  if (!canFlip || matchedIndices.includes(idx) || idx === firstCardIdx) return;
  if (messageEl.textContent !== '') return;

  if (firstCardIdx === null) {
    firstCardIdx = idx;
  } else if (secondCardIdx === null) {
    secondCardIdx = idx;
    canFlip = false;
    render();

    if (cards[firstCardIdx] === cards[secondCardIdx]) {
      matchedIndices.push(firstCardIdx, secondCardIdx);
      resetTurn();
      render();
      checkWin();
    } else {
      mismatchedIndices = [firstCardIdx, secondCardIdx];
      guessCount++;
      guessCountEl.textContent = guessCount;

      setTimeout(() => {
        mismatchedIndices = [];
        resetTurn();
        render();

        if (guessCount >= MAX_GUESSES) {
          messageEl.textContent = '❌ You lost! Press Reset Game to try again.';
          boardContainer.classList.add('lose');
          canFlip = false;
        }
      }, 1000);
    }
  }

  render();
}

function resetTurn() {
  firstCardIdx = null;
  secondCardIdx = null;
  canFlip = true;
}

function render() {
  boardEl.innerHTML = '';

  cards.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    if (matchedIndices.includes(idx)) {
      cardEl.classList.add('matched');
    }

    if (mismatchedIndices.includes(idx)) {
      cardEl.classList.add('mismatched');
    }

    if (matchedIndices.includes(idx) || idx === firstCardIdx || idx === secondCardIdx) {
      const imgEl = document.createElement('img');
      imgEl.src = `./images/${card}`;
      imgEl.alt = card.split('.')[0];
      imgEl.classList.add('card-img');
      cardEl.appendChild(imgEl);
    } else {
      cardEl.textContent = '?';
    }

    cardEl.addEventListener('click', () => handleCardClick(idx));
    boardEl.appendChild(cardEl);
  });
}

function checkWin() {
  if (matchedIndices.length === cards.length) {
    messageEl.textContent = '🎉 You won! Press Reset Game to play again.';
    boardContainer.classList.add('win');
    canFlip = false;
  }
}

function renderPreview() {
  const previewEl = document.getElementById('preview');
  previewEl.innerHTML = '';

  const uniqueImages = [...new Set(cards)];

  uniqueImages.forEach(filename => {
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    container.style.margin = '10px';
    container.style.textAlign = 'center';

    const imgEl = document.createElement('img');
    imgEl.src = `./images/${filename}`;
    imgEl.alt = filename.split('.')[0];
    imgEl.style.width = '80px';
    imgEl.style.height = '80px';
    imgEl.style.objectFit = 'contain';

    const label = document.createElement('p');
    label.textContent = filename.split('.')[0];

    container.appendChild(imgEl);
    container.appendChild(label);
    previewEl.appendChild(container);
  });
}

resetBtn.addEventListener('click', init);

startBtn.addEventListener('click', () => {
  rulesSection.style.display = 'none';
  gameSection.style.display = 'block';
  init();
});

init();
renderPreview();



