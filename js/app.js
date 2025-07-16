/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let board;
let firstCardIdx;
let secondCardIdx;
let canFlip;
let matchedIndices = [];

/*----- Cached Element References  -----*/
const boardEl = document.getElementById('board');
const resetBtn = document.getElementById('reset');

/*-------------- Functions -------------*/

// Initialize/reset the game state
function init() {
  board = [
    'A', 'A', 'B', 'B', 'C', 'C',
    'D', 'D', 'E', 'E', 'F', 'F'
  ];
  shuffleBoard();

  firstCardIdx = null;
  secondCardIdx = null;
  canFlip = true;
  matchedIndices = [];

  render();
}

// Shuffle the board array randomly
function shuffleBoard() {
  board.sort(() => Math.random() - 0.5);
}

// Handle card clicks and game logic
function handleCardClick(idx) {
  if (!canFlip) return;
  if (matchedIndices.includes(idx)) return;  // Ignore clicks on matched cards
  if (idx === firstCardIdx) return;           // Ignore clicking the same card twice

  if (firstCardIdx === null) {
    firstCardIdx = idx;
  } else if (secondCardIdx === null) {
    secondCardIdx = idx;
    canFlip = false;

    if (board[firstCardIdx] === board[secondCardIdx]) {
      // Cards match: save matched indices
      matchedIndices.push(firstCardIdx, secondCardIdx);
      resetTurn();
      render();
      checkWin();
    } else {
      // Not a match: flip cards back after 1 second
      setTimeout(() => {
        resetTurn();
        render();
      }, 1000);
    }
  }

  render();
}

// Reset card selections and allow flipping again
function resetTurn() {
  firstCardIdx = null;
  secondCardIdx = null;
  canFlip = true;
}

// Render cards on the board
function render() {
  boardEl.innerHTML = '';

  board.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    if (matchedIndices.includes(idx) || idx === firstCardIdx || idx === secondCardIdx) {
      cardEl.textContent = card;  // face-up card
    } else {
      cardEl.textContent = '?';   // face-down card
    }

    cardEl.addEventListener('click', () => handleCardClick(idx));
    boardEl.appendChild(cardEl);
  });
}

// Check if player has matched all cards
function checkWin() {
  if (matchedIndices.length === board.length) {
    alert("🎉 You won! Click Reset to play again.");
  }
}

/*----------- Event Listeners ----------*/
resetBtn.addEventListener('click', init);


/*-------------- Start Game -------------*/
init();
