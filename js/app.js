const MAX_GUESSES = 10;

let board;
let firstCardIdx;
let secondCardIdx;
let canFlip;
let matchedIndices = [];
let guessCount = 0;

const boardEl = document.getElementById('board');
const resetBtn = document.getElementById('reset');
const startBtn = document.getElementById('start');
const rulesSection = document.getElementById('rules');
const gameSection = document.getElementById('game');
const guessCountEl = document.getElementById('guess-count');
const messageEl = document.getElementById('message');

function init() {
  board = [
    'dolphin.png', 'dolphin.png',
    'shark.png', 'shark.png',
    'jellyfish.png', 'jellyfish.png',
    'clownfish.png', 'clownfish.png',
    'bluetang.png', 'bluetang.png',
    'seaturtle.png', 'seaturtle.png'
  ];
  shuffleBoard();

  firstCardIdx = null;
  secondCardIdx = null;
  canFlip = true;
  matchedIndices = [];
  guessCount = 0;
  guessCountEl.textContent = guessCount;
  messageEl.textContent = '';

  render();
}

function shuffleBoard() {
  board.sort(() => Math.random() - 0.5);
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

    if (board[firstCardIdx] === board[secondCardIdx]) {
      matchedIndices.push(firstCardIdx, secondCardIdx);
      resetTurn();
      render();
      checkWin();
    } else {
      guessCount++;
      guessCountEl.textContent = guessCount;

      if (guessCount >= MAX_GUESSES) {
        setTimeout(() => {
          messageEl.textContent = '❌ You lost! Press Reset Game to try again.';
          canFlip = false;
        }, 1000);
      } else {
        setTimeout(() => {
          resetTurn();
          render();
        }, 1000);
      }
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

  board.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

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
  if (matchedIndices.length === board.length) {
    messageEl.textContent = '🎉 You won! Press Reset Game to play again.';
    canFlip = false;
  }
}

function renderPreview() {
  const previewEl = document.getElementById('preview');
  previewEl.innerHTML = '';

  const uniqueImages = [...new Set(board)];

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


