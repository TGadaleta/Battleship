//Referenced Element Constants
const display = document.querySelector(".display");
const pGrid = document.querySelector("#pGrid");
const cGrid = document.querySelector("#cGrid");
const pScore = document.querySelector("#playerScoresheet");
const cScore = document.querySelector("#computerScoresheet");
const gameBtn = document.querySelector("#gameButton");
const instruct = document.querySelector("#instructions");

//Variables
const gridSize = 10; //how man cell rows and cols on each board
let message = (display.textContent = "Press Start Game");
const pGameBoard = []; //starting grid arrays
const cGameBoard = [];
let pTotalShips = 5;
let cTotalShips = 5;
const ships = [
  //ships array with an object for each ship
  { name: "carrier", length: 5, cHit: 0, pHit: 0 },
  { name: "battleship", length: 4, cHit: 0, pHit: 0 },
  { name: "destroyer", length: 3, cHit: 0, pHit: 0 },
  { name: "submarine", length: 3, cHit: 0, pHit: 0 },
  { name: "patrol-boat", length: 2, cHit: 0, pHit: 0 },
];
let setUpComplete = false; //tracks whether setup is complete
let turn = "p"; //the user player goes first
let gameOver = false;

//Functions
const createGameBoard = (gameBoard) => {
  //creates the 2D array that is used to control gameplay
  for (let row = 0; row < gridSize; row++) {
    let currentRow = [];
    for (let col = 0; col < gridSize; col++) {
      currentRow.push(null); //each value is set to null
    }
    gameBoard.push(currentRow);
  }
};

const createGrid = (gridEl) => {
  //creates the html grid that the game is played on
  //Create Grids Function
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let cell = document.createElement("div");
      cell.classList.add(gridEl.id, "cell", "water"); //
      cell.id = `${gridEl.id}-${row} ${col}`; //id is used to find location of cell
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
      if (orientation === 0) {
        //horizontal
        if (startCol + ship.length < 10) {
          //checks if the ship will fit in the current row
          let overlap = false;
          for (let i = 0; i < ship.length; i++) {
            if (gameBoard[startRow][startCol + i]) {
              //checks if there is already a ship in any of the cells
              overlap = true;
            }
          }
          if (!overlap) {
            //only if there is no overlap, places the ship name in the array
            for (let i = 0; i < ship.length; i++) {
              gameBoard[startRow][startCol + i] = ship.name;
            }
            isPlaced = true; //stops the while loop so it can go to the next ship
          }
        }
      } else {
        //vertical, same as horizontal but checks the col instead of the row
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

const updateGrid = (grid, gameBoard) => {
  //updates the grid to reflect what is in each gameBoard array
  if (!setUpComplete) {
    //only runs during setup
    grid.childNodes.forEach((cell) => {
      //checks each cell on the grid in order
      let row = cell.id.substring(6, 7); //collects the row from the cell id
      let col = cell.id.substring(8); //collects the col from the cell id
      if (gameBoard[row][col]) {
        //if the value at the row/col location on the array is a truthy (not null)
        cell.classList.add(gameBoard[row][col]); //add the ships name as a class
        cell.classList.add("ship"); //add ship as a class
      }
    });
  }
};

const buttonClickHandler = (event) => {
  if (!setUpComplete) {
    //if setup hasn't been completed yet run the setup functions
    placeShips(cGameBoard);
    placeShips(pGameBoard);
    updateGrid(pGrid, pGameBoard);
    updateGrid(cGrid, cGameBoard);
    setUpComplete = true; //setup is done once we run these functions
    instruct.innerHTML =
      "Click on a cell on the Computer's Board to make a guess.";
    event.target.innerHTML = "Restart Game";
  }
};

const checkGameOver = () => {
  if (cTotalShips <= 0) {
    console.log("Congratulations!!! You Won!!!");
    gameOver = true;
  }
  if (pTotalShips <= 0) {
    console.log("Bummer, the Computer Won...");
  }
};

const shipDestroyed = (shipName, hits) => {
  ships.forEach((ship) => {
    if (ship.name === shipName && ship.length === hits) {
      console.log(`The ${ship.name} has been sunk`);
      if (turn === "p") cTotalShips -= 1;
      if (turn === "c") pTotalShips -= 1;
    }
  });
  checkGameOver();
};

const guessHandler = (event, gameBoard) => {
  let cell = event.target;
  let row = cell.id.substring(6, 7); //collects the row from the cell id
  let col = cell.id.substring(8); //collects the col from the cell id
  if (setUpComplete) {
    if (cell.classList.contains("ship")) {
      cell.classList.add("hit");
      ships.forEach((ship) => {
        if (ship.name === gameBoard[row][col]) {
          if (turn === "p") {
            ship.pHit += 1;
            shipDestroyed(ship.name, ship.pHit);
          }
          if (turn === "c") {
            ship.cHit += 1;
            shipDestroyed(ship.name, ship.cHit);
          }
        }
      });
      console.log(`That's a hit at ${row},${col}`);
    } else {
      event.target.classList.add("miss");
      console.log(`That's a miss at ${row},${col}`);
    }
    turn = turn === "p" ? "c" : "p";
    console.log(turn);
  }
};

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
gameBtn.addEventListener("click", buttonClickHandler);
cGrid.addEventListener("click", (event) => guessHandler(event, cGameBoard));
pGrid.addEventListener("click", (event) => guessHandler(event, pGameBoard));
