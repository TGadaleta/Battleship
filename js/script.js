//Referenced Element Constants
const display = document.querySelector(".display");
const pGrid = document.querySelector("#pGrid");
const cGrid = document.querySelector("#cGrid");
const pScore = document.querySelector("#playerScoresheet");
const cScore = document.querySelector("#computerScoresheet");
const gameBtn = document.querySelector("#gameButton");

//Variables
const gridSize = 10; //how man cell rows and cols on each board
let message = (display.textContent = "Press Start Game");
const pGameBoard = []; //starting grid arrays
const cGameBoard = [];
const ships = [
  { name: "carrier", length: 5 },
  { name: "battleship", length: 4 },
  { name: "destroyer", length: 3 },
  { name: "submarine", length: 3 },
  { name: "patrol-boat", length: 2 },
];

//Functions
const createGameBoard = (gameBoard) => {
  for (let row = 0; row < gridSize; row++) {
    let currentRow = [];
    for (let col = 0; col < gridSize; col++) {
      currentRow.push(null);
    }
    gameBoard.push(currentRow);
  }
};

const createGrid = (gridEl) => {
  //Create Grids Function
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let cell = document.createElement("div");
      cell.classList.add(gridEl.id, "cell", "water");
      cell.id = `${gridEl.id}-${row},${col}`; //data attributs for finding location of cell
      gridEl.appendChild(cell);
    }
  }
};

const placeShips = (gameBoard) => {
  ships.forEach((ship) => {
    let isPlaced = false;
    while (!isPlaced) {
      let orientation = Math.floor(Math.random() * 2); //orientation will either be 0 or 1
      let startRow = Math.floor(Math.random() * 10); //picks 0-9
      let startCol = Math.floor(Math.random() * 10); //picks 0-9
      console.log(orientation);
      if (orientation === 0) {
        //horizontal
        if (startCol + ship.length < 10) {
          let overlap = false;
          for (let i = 0; i < ship.length; i++) {
            if (gameBoard[startRow][startCol + i]) {
              overlap = true;
            }
          }
          if (!overlap) {
            for (let i = 0; i < ship.length; i++) {
              gameBoard[startRow][startCol + i] = ship.name;
            }
            isPlaced = true;
          }
        }
      } else {
        //vertical
        if (startRow + ship.length < 10) {
          let overlap = false;
          for (let i = 0; i < ship.length; i++) {
            if (gameBoard[startRow + i][startCol]) {
              overlap = true;
            }
          }
          if (!overlap) {
            for (let i = 0; i < ship.length; i++) {
              gameBoard[startRow + i][startCol] = ship.name;
            }
            isPlaced = true;
          }
        }
      }
    }
  });
};

function buttonClickHandler(event) {
  gameState = "setup";
  message = "Set Up Board";
  event.target.innerText = message;
  display.textContent = message;
}

function init() {
  //initial state function
  createGameBoard(pGameBoard); //creates player game board
  createGameBoard(cGameBoard); //creates computer game board
  createGrid(pGrid); //creates player grid
  createGrid(cGrid); //creates computer grid
  placeShips(cGameBoard);
  placeShips(pGameBoard);
}

//Fill out scoresheets
//allow user to place ships

//Call Functions
init(); //calls function when page is opened

//Event Listeners
gameBtn.addEventListener("click", buttonClickHandler);
