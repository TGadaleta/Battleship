//Referenced Element Constants
const display = document.querySelector(".display");
const pGrid = document.querySelector("#pGrid");
const cGrid = document.querySelector("#cGrid");
const gameBtn = document.querySelector("#gameButton");
const instruct = document.querySelector("#instructions");

//Variables
const gridSize = 10; //how man cell rows and cols on each board
display.textContent = "Press Start Game";
const pGameBoard = []; //starting grid arrays
const cGameBoard = [];
let pTotalShips = 5;
let cTotalShips = 5;
const ships = [
  //ships array with an object for each ship
  { name: "Carrier", length: 5, cHit: 0, pHit: 0 },
  { name: "Battleship", length: 4, cHit: 0, pHit: 0 },
  { name: "Destroyer", length: 3, cHit: 0, pHit: 0 },
  { name: "Submarine", length: 3, cHit: 0, pHit: 0 },
  { name: "Patrol-boat", length: 2, cHit: 0, pHit: 0 },
];
let setUpComplete = false; //tracks whether setup is complete
let turn = "p"; //the player goes first
let gameOver = false;
const directions = [
  { row: 0, col: 1 }, //right
  { row: 0, col: -1 }, //left
  { row: 1, col: 0 }, //down
  { row: -1, col: 0 }, //up
];
let cLastHit = []; //array used for smart computer guesses
let nextGuess; //variable used for smart computer guesses

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
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let cell = document.createElement("div");
      cell.classList.add(gridEl.id, "cell", "water"); //needed classes for styling
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

const loadGrid = (grid, gameBoard) => {
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
};

const startGame = (event) => {
  placeShips(cGameBoard); //places ships on the game board
  placeShips(pGameBoard);
  loadGrid(pGrid, pGameBoard); //places ships on the game grid
  loadGrid(cGrid, cGameBoard);
  setUpComplete = true; //setup is done once we run these functions
  display.innerHTML = "Click Restart Game to Restart the Game";
  instruct.innerHTML =
    "Click on a cell on the Computer's Board to make a guess.";
  event.target.innerHTML = "Restart Game";
};

const restartGame = (event) => {
  pGameBoard.length = 0; //reset all variables
  cGameBoard.length = 0;
  pGrid.innerHTML = "";
  cGrid.innerHTML = "";
  let shipMarkers = document.querySelectorAll(".shipmarker");
  shipMarkers.forEach((marker) => marker.classList.remove("hit"));
  ships.forEach((ship) => {
    //reset hit count for each ship
    ship.cHit = 0;
    ship.pHit = 0;
  });
  pTotalShips = 5;
  cTotalShips = 5;
  gameOver = false;
  cLastHit.length = 0;
  init();
  startGame(event);
};

const pGuessHandler = (event) => {
  turn = "p";
  if (!gameOver && setUpComplete) {
    let cell = event.target; //grabs the cell that was clicked
    let row = Number(cell.id.substring(6, 7)); //using the cells id, getting the row value
    let col = Number(cell.id.substring(8)); //using the cells id, getting the col
    if (cell.classList.contains("water")) {
      //if it has water it wasn't checked before
      cell.classList.remove("water"); //removes water class to show the cell has been checked
      instruct.innerHTML = ""; //clears the instruct display
      if (cell.classList.contains("ship")) {
        //if there is a ship was placed
        aHit(cell, cGameBoard[row][col]); //go to the hit logic
        cGameBoard[row][col] = "hit"; //add hit to the computer game board
      } else {
        aMiss(cell); //go to the miss logic
        cGameBoard[row][col] = "miss"; //
      }
      cGuesses(); //immediately call the computer guess function
    }
  }
};

const cGuesses = () => {
  if (!gameOver && setUpComplete) {
    //if setup is complete and the game is not over
    turn = "c"; //makes sure turn is set to the computer
    if (!cLastHit.length) {
      //if the array is empty
      let randomIndex = Math.floor(Math.random() * 100); //pick a random number between 0-99
      let randomCell = pGrid.childNodes[randomIndex]; //select a cell on the players grid based on the number
      if (randomCell.classList.contains("water")) {
        //if it contains the class water, the cell has not been picked before
        randomCell.classList.remove("water"); //the cell has been clicked so we remove water
        randomCell.click(); //we click the cell and go to the click event handler
      } else cGuesses(); //if the cell doesn't contain the class water, then guess again
    } else {
      let index = 0;
      do {
        //logic to check for the next guess. will continue to call smartGuess until a valid cell is selected
        let lastRow = cLastHit[index].row;
        let lastCol = cLastHit[index].col;
        nextGuess = smartGuess(lastRow, lastCol);
        index++;
      } while (!nextGuess);
      nextGuess.classList.remove("water");
      nextGuess.click();
    }
  }
};

const smartGuess = (lastRow, lastCol) => {
  //logic that is used by the computer to make a smarter guess after a hit
  for (let i = 0; i < 4; i++) {
    if (
      //logic that makes sure the next guess is on the grid
      lastRow + directions[i].row < gridSize &&
      lastRow + directions[i].row > -1 &&
      lastCol + directions[i].col < gridSize &&
      lastCol + directions[i].col > -1
    ) {
      let selectedCell = //grabs the cell using the row and col coordinates from the gameboard translated to an index for the grid
        pGrid.childNodes[
          Number(
            String(lastRow + directions[i].row) +
              String(lastCol + directions[i].col)
          )
        ];
      if (selectedCell.classList.contains("water")) {
        //makes sure the cell has not been clicked before
        return selectedCell;
      }
    }
  }
};

const cGuessHandler = (event) => {
  let cell = event.target; //grabs the cell that was clicked
  let row = Number(cell.id.substring(6, 7)); //using the cells id, getting the row value
  let col = Number(cell.id.substring(8)); //using the cells id, getting the col
  if (cell.classList.contains("ship")) {
    cLastHit.unshift({ row: row, col: col });
    aHit(cell, pGameBoard[row][col]);
  } else aMiss(cell);
};

const aHit = (cell, shipName) => {
  cell.classList.add("hit"); //adds the class hit to change style
  ships.forEach((ship) => {
    if (shipName === ship.name) {
      player = turn === "p" ? "You" : "The computer"; //changes the text based on whose turn it is
      instruct.innerHTML += `\n${player} hit a ${shipName}!`; //text to show player
      ship[turn + "Hit"]++;
      scoreSheetUpdate(shipName, ship[turn + "Hit"]);
      shipDestroyed(ship.name, ship[turn + "Hit"]);
    }
  });
};

const aMiss = (cell) => {
  //logic for handling a miss
  cell.classList.add("miss");
  player = turn === "p" ? "You" : "The computer";
  instruct.innerHTML += `\n${player} missed!`;
};

const scoreSheetUpdate = (shipName, numHits) => {
  if (turn === "p") {
    //if it's the players turn
    let shipMarkers = document.querySelectorAll(`.c${shipName}.shipmarker`); //gets all the shipmarkers for the ship that was hit
    shipMarkers[shipMarkers.length - numHits].classList.add("hit"); //takes the last shipmarker w/out the class hit and adds the class
  }
  if (turn === "c") {
    //if it's the computers turn
    let shipMarkers = document.querySelectorAll(`.p${shipName}.shipmarker`); //same as above
    shipMarkers[shipMarkers.length - numHits].classList.add("hit");
  }
};

const shipDestroyed = (shipName, hits) => {
  ships.forEach((ship) => {
    //looks through our ships array and checks on the object of the ship that was hit
    if (ship.name === shipName && ship.length === hits) {
      //if the amount of hits equals the length of the ship, it is sunk
      if (turn === "p") {
        instruct.innerHTML += `\nYou sunk the computer's ${shipName}!`;
        cTotalShips -= 1; //keeps track of the ships for the game over condition
      }
      if (turn === "c") {
        instruct.innerHTML += `\nThe computer sunk your ${shipName}!`;
        pTotalShips -= 1; //keeps track of the ships for the game over condition
        for (let i = 0; i < hits; i++) {
          cLastHit.shift();
        }
      }
    }
  });
  checkGameOver();
};

const checkGameOver = () => {
  if (cTotalShips <= 0) {
    //all ships have been destroyed
    instruct.innerHTML += "\nCongratulations!!! You Won!!!";
    display.innerHTML = "Click Restart Game to Play Again";
    gameOver = true;
  }
  if (pTotalShips <= 0) {
    instruct.innerHTML += "\nBummer, the Computer Won...";
    display.innerHTML = "Click Restart Game to Play Again";
    gameOver = true;
  }
};

function init() {
  //initial state function
  createGameBoard(pGameBoard); //creates player game board
  createGameBoard(cGameBoard); //creates computer game board
  createGrid(pGrid); //creates player grid
  createGrid(cGrid); //creates computer grid
}

//Call Functions
init(); //calls function when page is opened

//Event Listeners
cGrid.addEventListener("click", pGuessHandler);
pGrid.addEventListener("click", cGuessHandler);
gameBtn.addEventListener("click", (event) => {
  //ChatGPT
  if (!setUpComplete) startGame(event);
  else restartGame(event);
});
