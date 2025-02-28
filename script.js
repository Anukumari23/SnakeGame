// script.js

const board = document.getElementById("board");
const diceValue = document.getElementById("diceValue");
const rollDiceBtn = document.getElementById("rollDice");
const playerTurnElem = document.getElementById("playerTurn");
const player1PositionElem = document.getElementById("player1Position");
const player2PositionElem = document.getElementById("player2Position");

// Initialize board
const boardSize = 100;
const snakes = { 16: 6, 48: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

let currentPlayer = 1;
let playerPositions = [1, 1];

// Create the board grid
function createBoard() {
  for (let i = boardSize; i >= 1; i--) {
    const cell = document.createElement("div");
    cell.innerText = i;
    if (snakes[i]) cell.classList.add("snake");
    if (ladders[i]) cell.classList.add("ladder");
    board.appendChild(cell);
  }
}

// Roll Dice
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Update Player Position
function updatePlayerPosition(player, diceRoll) {
  const currentPosition = playerPositions[player - 1];
  let newPosition = currentPosition + diceRoll;

  if (newPosition > boardSize) {
    newPosition = currentPosition; // Stay in place if roll exceeds board size
  } else if (snakes[newPosition]) {
    newPosition = snakes[newPosition]; // Hit a snake
  } else if (ladders[newPosition]) {
    newPosition = ladders[newPosition]; // Hit a ladder
  }

  playerPositions[player - 1] = newPosition;
  document.getElementById(`player${player}Position`).innerText = newPosition;

  // Check for win condition
  if (newPosition === boardSize) {
    alert(`Player ${player} wins!`);
    resetGame();
  }
}

// Handle Dice Roll
rollDiceBtn.addEventListener("click", () => {
  const diceRoll = rollDice();
  diceValue.innerText = diceRoll;

  updatePlayerPosition(currentPlayer, diceRoll);

  // Switch Player Turn
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  playerTurnElem.innerText = `Player ${currentPlayer}`;
});

// Reset Game
function resetGame() {
  playerPositions = [1, 1];
  player1PositionElem.innerText = 1;
  player2PositionElem.innerText = 1;
  currentPlayer = 1;
  playerTurnElem.innerText = "Player 1";
  diceValue.innerText = "-";
}

// Initialize Game
createBoard();
