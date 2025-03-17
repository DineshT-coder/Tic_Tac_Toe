const board = document.getElementById('board');
const winnerText = document.getElementById('winner');
const resetButton = document.getElementById('reset');
const cells = [];
let currentPlayer = 'X';
let gameActive = true;


const clapSound = new Audio('./js/small-claps-sound-effect-272060.mp3');


function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      gameActive = false;
      winnerText.textContent = `${cells[a].textContent} Wins! 🎉`;
      clapSound.currentTime = 0; 
      clapSound.play(); 
      setTimeout(() => {
        clapSound.pause();
        clapSound.currentTime = 0; 
      }, 2000);
      return;
    }
  }

  if (cells.every(cell => cell.textContent)) {
    gameActive = false;
    winnerText.textContent = 'Draw! 🤝';
  }
}


function handleClick(event) {
  if (!gameActive || event.target.textContent) return;
  event.target.textContent = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  checkWinner();
}


function resetGame() {
  cells.forEach(cell => (cell.textContent = ''));
  winnerText.textContent = '';
  currentPlayer = 'X';
  gameActive = true;
}


for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.addEventListener('click', handleClick);
  board.appendChild(cell);
  cells.push(cell);
}


resetButton.addEventListener('click', resetGame);
