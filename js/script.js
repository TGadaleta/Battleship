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
display.textContent = "Press Start Game";
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
let turn = "p"; //the player goes first
let gameOver = false;

//TODO create computer turn logic (for randomization)
//TODO update display properly

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

const updateGrid = (grid, gameBoard) => {
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

const checkGameOver = () => {
  if (cTotalShips <= 0) {
    //all ships have been destroyed
    instruct.innerHTML += "\n\nCongratulations!!! You Won!!!";
    display.innerHTML = "Click Restart Game";
    gameOver = true;
  }
  if (pTotalShips <= 0) {
    instruct.innerHTML += "\n\nBummer, the Computer Won...";
    display.innerHTML = "Click Restart Game";
    gameOver = true;
  }
};

const startGame = (event) => {
  placeShips(cGameBoard);
  placeShips(pGameBoard);
  updateGrid(pGrid, pGameBoard);
  updateGrid(cGrid, cGameBoard);
  setUpComplete = true; //setup is done once we run these functions
  instruct.innerHTML = 'Click on a cell on the Computer\'s Board to make a guess'
  event.target.innerHTML = "Restart Game";
};

const restartGame = (event) => {
  pGameBoard.length = 0; //reset all variables
  cGameBoard.length = 0;
  pGrid.innerHTML = "";
  cGrid.innerHTML = "";
  ships.forEach((ship) => {
    //reset hit count for each ship
    ship.cHit = 0;
    ship.pHit = 0;
  });
  pTotalShips = 5;
  cTotalShips = 5;
  instruct.innerHTML =
  gameOver = false;
  init();
  startGame(event);
};

const guessHandler = (event, gameBoard) => {
  let cell = event.target;
  let row = cell.id.substring(6, 7); //collects the row from the cell id
  let col = cell.id.substring(8); //collects the col from the cell id
  if (
    setUpComplete &&
    !cell.classList.contains("hit") &&
    !cell.classList.contains("miss") &&
    !gameOver
  ) {
    //checks if setup is done and the cell has not been clicked before and the game over conditions have not been met
    if (cell.classList.contains("ship")) {
      //checks if the classlist contains ship
      cell.classList.add("hit"); //adds to classlist
      ships.forEach((ship) => {
        //checks each ship on the ships array
        if (ship.name === gameBoard[row][col]) {
          //find the object (ship) with the same value as the gameBoard array
          if (turn === "p") {
            //if it is the player's turn
            ship.pHit += 1; //increase the number of hits for this ship for the player
            instruct.innerHTML = `You hit the computer's ${gameBoard[row][col]}.`;
            shipDestroyed(ship.name, ship.pHit); //see if the ship is destroyed
          }
          if (turn === "c") {
            //if it is the computer's turn
            ship.cHit += 1; //increase the number of hits for this ship for the computer
            instruct.innerHTML += `\n\nThe computer hit your ${gameBoard[row][col]}.`;
            shipDestroyed(ship.name, ship.cHit); //see if the ship is destroyed
          }
        }
      });
    } else {
      event.target.classList.add("miss");
      if (turn === "p") instruct.innerHTML = `You missed.`;
      if (turn === "c") instruct.innerHTML += `\n\nThe computer missed.`;
    }
    turn = turn === "p" ? "c" : "p";
  }
  cGuesses();
};

const shipDestroyed = (shipName, hits) => {
  ships.forEach((ship) => {
    if (ship.name === shipName && ship.length === hits) {
      if (turn === "p") {
        instruct.innerHTML = `You hit and sunk the computer's ${shipName}!`;
        cTotalShips -= 1;
      }
      if (turn === "c") {
        instruct.innerHTML += `\n\nThe computer hit and sunk your ${shipName}!`;
        pTotalShips -= 1;
      }
    }
  });
  checkGameOver();
};

const cGuesses = () => {
  if (turn === "c") {
    let randomIndex = Math.floor(Math.random() * 100);
    let selectedCell = pGrid.childNodes[randomIndex];
    if (
      !(
        selectedCell.classList.contains("miss") ||
        selectedCell.classList.contains("hit")
      )
    ) {
      console.log("Computer is Guessing");
      selectedCell.click();
      turn = turn === "c" ? "c" : "p";
    }
    else {cGuesses()}
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
cGrid.addEventListener("click", (event) => guessHandler(event, cGameBoard)); //Chat-GPT
pGrid.addEventListener("click", (event) => guessHandler(event, pGameBoard)); //Chat-GPT
gameBtn.addEventListener("click", (event) => {
  //ChatGPT
  if (!setUpComplete) startGame(event);
  else restartGame(event);
});
