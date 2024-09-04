const board = document.getElementById("board");
const currentPlayerDisplay = document.getElementById("current-player");
const currentPlayerIndicator = document.querySelector(".current-player-indicator");
const restartButton = document.getElementById("restart");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const j1 = document.getElementById("joueurX");
const j2 = document.getElementById("joueurO");

let currentPlayer;
let gameBoard;
let boardSize = parseInt(localStorage.getItem("boardSize"));
let winCondition = parseInt(localStorage.getItem("winCondition"));
let score = { playerX: 0, playerO: 0 };
let playerX, playerO;

j1.textContent = `Joueur ${localStorage.getItem("playerX")}`;
j2.textContent = `Joueur ${localStorage.getItem("playerO")}`;

document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.menu').classList.toggle('active');
});

function loadPlayerSymbols() {
  playerX = localStorage.getItem("playerX");
  playerO = localStorage.getItem("playerO");
  currentPlayer = Math.random() < 0.5 ? playerX : playerO;
  updateCurrentPlayer();
}

// update cell size based on screen width
function calculateCellSize() {
  const screenWidth = window.innerWidth;
  const totalCells = boardSize * boardSize;
  let maxBoardWidth;

  if (screenWidth <= 600) {
    maxBoardWidth = totalCells < 40 ? screenWidth * 0.55 : screenWidth * 0.7;
  } else {
    maxBoardWidth = totalCells < 100 ? screenWidth * 0.25 : screenWidth * 0.4;
  }

  return Math.floor(maxBoardWidth / boardSize);
}

function updateBoardSize() {
  const cellSize = calculateCellSize();
  document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);
  board.style.width = `${cellSize * boardSize}px`;
  board.style.height = `${cellSize * boardSize}px`;
}

function createBoard() {
  board.innerHTML = '';
  gameBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(""));

  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  updateBoardSize();
  applyChessboardPattern();
}

function applyChessboardPattern() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
      const row = Math.floor(index / boardSize);
      const col = index % boardSize;
      if ((row + col) % 2 === 0) {
          cell.classList.add('light');
      }
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;

  if (gameBoard[row][col] === "") {
    gameBoard[row][col] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(`${currentPlayer === playerX ? "x" : "o"}`);

    if (checkWin(row, col)) {
      setTimeout(() => {
        alert(`Le joueur ${currentPlayer} a gagné !`);
        currentPlayer === playerX ? score.playerX++ : score.playerO++;
        updateScore();
        resetBoard();
      }, 100);
    } else if (checkDraw()) {
      alert("Match nul !");
      resetBoard();
    } else {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
      updateCurrentPlayer();
    }
  }
}

function checkWin(row, col) {
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

  for (let direction of directions) {
    let [dx, dy] = direction;
    let count = 1;

    // Check in positive direction
    for (let i = 1; i < winCondition; i++) {
      let newRow = row + i * dx;
      let newCol = col + i * dy;
      if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize || gameBoard[newRow][newCol] !== currentPlayer) break;
      count++;
    }

    // Check in negative direction
    for (let i = 1; i < winCondition; i++) {
      let newRow = row - i * dx;
      let newCol = col - i * dy;
      if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize || gameBoard[newRow][newCol] !== currentPlayer) break;
      count++;
    }

    if (count >= winCondition) return true;
  }

  return false;
}

function checkDraw() {
  return gameBoard.every(row => row.every(cell => cell !== ""));
}

function resetBoard() {
  gameBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(""));
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  currentPlayer = Math.random() < 0.5 ? playerX : playerO;
  updateCurrentPlayer();
}

function updateCurrentPlayer() {
  currentPlayerDisplay.textContent = `${currentPlayer}`;
  currentPlayerIndicator.style.backgroundColor = currentPlayer === playerX ? "#ff4136" : "#159282";
}

function updateScore() {
  scoreX.textContent = `${score.playerX}`;
  scoreO.textContent = `${score.playerO}`;
}

function saveScore() {
  localStorage.setItem("ticTacToeScore", JSON.stringify(score));
}

function loadScore() {
  const savedScore = localStorage.getItem("ticTacToeScore");
  if (savedScore) {
    score = JSON.parse(savedScore);
    updateScore();
  }
}

restartButton.addEventListener("click", () => {
  resetBoard();
  updateScore();
});

document.addEventListener("DOMContentLoaded", function () {
  loadPlayerSymbols();
  createBoard();
  loadScore();
});

window.addEventListener("beforeunload", saveScore);