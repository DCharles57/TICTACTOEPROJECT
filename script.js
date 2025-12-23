const cells = Array.from(document.querySelectorAll(".cell"));
const statusText = document.getElementById("statusText");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let board = Array(9).fill("");
let turn = "X";
let gameOver = false;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function setMessage(text) {
  message.textContent = text || "";
}

function updateUI() {
  statusText.textContent = gameOver ? "Game Over" : `Turn: ${turn}`;
}

function checkWinner() {
  for (const [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a,b,c] };
    }
  }
  if (board.every(v => v)) return { winner: "draw", line: [] };
  return null;
}

function endGame(result) {
  gameOver = true;

  if (result.winner === "draw") {
    setMessage("Draw 😮‍💨 Reset and run it back.");
  } else {
    setMessage(`${result.winner} wins 🏆`);
    result.line.forEach(i => cells[i].classList.add("win"));
  }

  cells.forEach(btn => (btn.disabled = true));
  updateUI();
}

function handleClick(e) {
  const i = Number(e.currentTarget.dataset.i);
  if (gameOver || board[i]) return;

  board[i] = turn;
  e.currentTarget.textContent = turn;

  const result = checkWinner();
  if (result) return endGame(result);

  turn = turn === "X" ? "O" : "X";
  setMessage("");
  updateUI();
}

function reset() {
  board = Array(9).fill("");
  turn = "X";
  gameOver = false;

  cells.forEach(btn => {
    btn.textContent = "";
    btn.disabled = false;
    btn.classList.remove("win");
  });

  setMessage("");
  updateUI();
}

cells.forEach(btn => btn.addEventListener("click", handleClick));
resetBtn.addEventListener("click", reset);

reset();
