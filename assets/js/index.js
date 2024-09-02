const board = document.getElementById("board");
const currentPlayerDisplay = document.getElementById("current-player");
const currentPlayerIndicator = document.querySelector(".current-player-indicator");
const restartButton = document.getElementById("restart");

const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");


document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.menu').classList.toggle('active');
});

let currentPlayer = "X";
let gameBoard = Array(20)
  .fill()
  .map(() => Array(20).fill(""));
let score = { X: 0, O: 0 };

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
    e.target.classList.add(currentPlayer.toLowerCase());

    if (checkWin(row, col)) {
      alert(`Le joueur ${currentPlayer} a gagné !`);
      score[currentPlayer]++;
      updateScore();
      resetBoard();
    } else if (checkDraw()) {
      alert("Match nul !");
      resetBoard();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateCurrentPlayer();
    }
  }
}

function checkWin(row, col) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let [dx, dy] of directions) {
    let count = 1;
    for (let i = 1; i < 5; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;
      if (newRow < 0 || newRow >= 20 || newCol < 0 || newCol >= 20 || gameBoard[newRow][newCol] !== currentPlayer) {
          break;
      }
      count++;
  }

  for (let i = 1; i < 5; i++) {
      const newRow = row - i * dx;
      const newCol = col - i * dy;
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
  currentPlayer = "X";
  updateCurrentPlayer();
}

function updateCurrentPlayer() {
  currentPlayerDisplay.textContent = `${currentPlayer}`;
  currentPlayerIndicator.style.backgroundColor = currentPlayer === "X" ? "#ff4136" : "#159282";
}

function updateScore() {
  scoreX.textContent = `${score.X}`;
  scoreO.textContent = `${score.O}`;
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

createBoard();
updateScore();
createBoard(20);

window.addEventListener("beforeunload", saveScore);
loadScore();