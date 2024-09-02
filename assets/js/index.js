const board = document.getElementById("board");
const currentPlayerDisplay = document.getElementById("current-player");
const currentPlayerIndicator = document.querySelector(".current-player-indicator");
const restartButton = document.getElementById("restart");

const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");

const j1 = document.getElementById("joueurX");
const j2 = document.getElementById("joueurO");


j1.textContent = `Joueur ${localStorage.getItem("playerX")}`;
j2.textContent = `Joueur ${localStorage.getItem("playerO")}`;

// Toggle Menu :
document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.menu').classList.toggle('active');
});

let currentPlayer;
let gameBoard = Array(20)
  .fill()
  .map(() => Array(20).fill(""));
let score = { playerX: 0, playerO: 0 };

// On game page load, retrieve symbols from local storage
function loadPlayerSymbols() {
  playerX = localStorage.getItem("playerX");
  playerO = localStorage.getItem("playerO");

  // Randomly decide who starts first
  currentPlayer = Math.random() < 0.5 ? playerX : playerO;
  updateCurrentPlayer();
}

function createBoard(col) {
  for (let i = 0; i < col * col; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
    board.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  const row = Math.floor(index / 20);
  const col = index % 20;

  e.target.style.borderRadius = "4px";
  e.target.style.border = "1px solid #fff";

  if (gameBoard[row][col] === "") {
    gameBoard[row][col] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(`${currentPlayer === playerX ? "x" : "o"}`);

    if (checkWin(row, col)) {
      setTimeout(() => {
        alert(`Le joueur ${currentPlayer} a gagné !`);
        
        currentPlayer === playerX ? score.playerX++ : score.playerO++;
        score[currentPlayer]++;

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
  const right = [0, 1];
  const down = [1, 0];
  const diagonalDownRight = [1, 1];
  const diagonalDownLeft = [1, -1];

  const directions = [right, down, diagonalDownRight, diagonalDownLeft];

  for (let i = 0; i < directions.length; i++) {
    let direction = directions[i];
    let dx = direction[0];
    let dy = direction[1];
    let count = 1;

    // Check in the positive direction (right, down, diagonal)
    for (let j = 1; j < 5; j++) {
      let newRow = row + j * dx;
      let newCol = col + j * dy;

      // Check if the new position is valid
      if (newRow < 0 || newRow >= 20 || newCol < 0 || newCol >= 20 || gameBoard[newRow][newCol] !== currentPlayer) {
        break;
      }
      count++;
    }

    // Check in the opposite direction (left, up, diagonal)
    for (let j = 1; j < 5; j++) {
      let newRow = row - j * dx;
      let newCol = col - j * dy;

      // Check if the new position is valid
      if (newRow < 0 || newRow >= 20 || newCol < 0 || newCol >= 20 || gameBoard[newRow][newCol] !== currentPlayer) {
        break;
      }
      count++;
    }

    if (count >= 5) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return gameBoard.every((row) => row.every((cell) => cell !== ""));
}

function resetBoard() {
  gameBoard = Array(20)
    .fill()
    .map(() => Array(20).fill(""));
  document.querySelectorAll(".cell").forEach((cell) => {
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

// Run on page load
document.addEventListener("DOMContentLoaded", function () {
  loadPlayerSymbols();
  createBoard(20);
  loadScore();
});

window.addEventListener("beforeunload", saveScore);