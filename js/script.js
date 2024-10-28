//Referenced Element Constants
const display = document.querySelector(".display");
const grids = document.querySelectorAll(".grid");
const pGrid = document.querySelector("#pGrid");
const cGrid = document.querySelector("#cGrid");
const playerScore = document.querySelector("#playerScoresheet");
const computerScore = document.querySelector("#computerScoresheet");
const gameBtn = document.querySelector("#gameButton");

//Variables
const gridSize = 10; //how man cell rows and cols on each board
const carrierL = 5;
const battleshipL = 4; //length of
const destroSubL = 3; //ships
const pBoutL = 2;
let message = (display.textContent = "Press Start Game");
const pGameBoard = []; //starting grid arrays
const cGameBoard = [];
let gameState = null;
const ships = [
    {name: 'carrier', length: 5},
    {name: 'battleship', length: 4},
    {name: 'destroyer', length: 3},
    {name: 'submarine', length: 3},
    {name: 'patrol boat', length: 2}
]



//TODO handle placing of ships at beggining of game(player and computer)
//TODO handle picking of cells to guess (player and computer)

//Functions
const createGameBoard = gameBoard => {
    for (let row = 0; row < gridSize; row++) {
      let currentRow = [];
      for (let col = 0; col < gridSize; col++) {
        currentRow.push("water");
      }
      gameBoard.push(currentRow);
    }
  }

const createGrid = gridEl => {
    //Create Grids Function
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        let cell = document.createElement("div");
        cell.classList.add(gridEl.id, "cell", 'water');
        cell.id = `${gridEl.id}-${row},${col}`; //data attributs for finding location of cell
        gridEl.appendChild(cell);
      }
    }
  }

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
  }

//Fill out scoresheets
//allow user to place ships

//Call Functions
init(); //calls function when page is opened

//Event Listeners
//grids.forEach((cell) => cell.addEventListener("click", gridClickHandler));
gameBtn.addEventListener("click", buttonClickHandler);
