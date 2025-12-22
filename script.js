const cells = Array.from(document.querySelectorAll(".cell"));
const turnEl = document.getElementById("turn");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let board = Array(9).fill("");
let turn = "X";
let gameOver = false;

const wins = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

function setMessage(text){
  messageEl.textContent = text;
}

function checkWinner(){
  for (const [a,b,c] of wins){
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      return board[a]; // "X" or "O"
    }
  }
  if (board.every(v => v !== "")) return "draw";
  return null;
}

function endGame(result){
  gameOver = true;

  if (result === "draw"){
    setMessage("Draw.");
  } else {
    setMessage(`${result} wins!`);
  }

  cells.forEach(btn => (btn.disabled = true));
}

function updateUI(){
  cells.forEach((btn, i) => {
    btn.textContent = board[i];
    btn.disabled = gameOver || board[i] !== "";
  });
  turnEl.textContent = turn;
}

function handleClick(e){
  const i = Number(e.currentTarget.dataset.i);
  if (gameOver || board[i]) return;

  board[i] = turn;

  const result = checkWinner();
  if (result){
    updateUI();
    endGame(result);
    return;
  }

  turn = (turn === "X") ? "O" : "X";
  setMessage("");
  updateUI();
}

function reset(){
  board = Array(9).fill("");
  turn = "X";
  gameOver = false;
  setMessage("");
  cells.forEach(btn => (btn.disabled = false));
  updateUI();
}

cells.forEach(btn => btn.addEventListener("click", handleClick));
resetBtn.addEventListener("click", reset);

updateUI();
