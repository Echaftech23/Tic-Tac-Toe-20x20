const board = document.getElementById("board");
const currentPlayerDisplay = document.getElementById("current-player");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");

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