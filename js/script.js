//Referenced Element Constants
const display = document.querySelector(".display");
const pGrid = document.querySelector("#pGrid");
const cGrid = document.querySelector("#cGrid");
const gameBtn = document.querySelector("#gameButton");
const instruct = document.querySelector("#instructions");
const cCarrier = document.querySelectorAll(".cCarrier");

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
let cLastHit = null;
//Functions
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

const checkGameOver = () => {
  if (cTotalShips <= 0) {
    //all ships have been destroyed
    instruct.innerHTML += "\n\nCongratulations!!! You Won!!!";
    display.innerHTML = "Click Restart Game to Play Again";
    gameOver = true;
  }
  if (pTotalShips <= 0) {
    instruct.innerHTML += "\n\nBummer, the Computer Won...";
    display.innerHTML = "Click Restart Game to Play Again";
    gameOver = true;
  }
};

const startGame = (event) => {
  placeShips(cGameBoard);
  placeShips(pGameBoard);
  loadGrid(pGrid, pGameBoard);
  loadGrid(cGrid, cGameBoard);
  setUpComplete = true; //setup is done once we run these functions
  display.innerHTML = 'Click Restart Game to Restart the Game'
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
  init();
  startGame(event);
};

// const guessHandler = (event, gameBoard) => {
//   let cell = event.target;
//   let row = Number(cell.id.substring(6, 7)); //collects the row from the cell id
//   let col = Number(cell.id.substring(8)); //collects the col from the cell id
//   if (
//     setUpComplete &&
//     !cell.classList.contains("hit") &&
//     !cell.classList.contains("miss") &&
//     !gameOver
//   ) {
//     //checks if setup is done and the cell has not been clicked before and the game over conditions have not been met
//     if (cell.classList.contains("ship")) {
//       //checks if the classlist contains ship
//       cell.classList.add("hit"); //adds to classlist
//       cell.classList.remove('water');
//       ships.forEach((ship) => {
//         //checks each ship on the ships array
//         if (ship.name === gameBoard[row][col]) {
//           //find the object (ship) with the same value as the gameBoard array
//           if (turn === "p") {
//             //if it is the player's turn
//             ship.pHit += 1; //increase the number of hits for this ship for the player
//             instruct.innerHTML = `You hit the computer's ${gameBoard[row][col]}!`;
//             gameBoard[row][col] = 'hit'
//             scoreSheetUpdate(ship.name, ship.pHit); //update the scoresheet
//             shipDestroyed(ship.name, ship.pHit); //see if the ship is destroyed
//           }
//           if (turn === "c") {
//             //if it is the computer's turn
//             ship.cHit += 1; //increase the number of hits for this ship for the computer
//             instruct.innerHTML += `\n\nThe computer hit your ${gameBoard[row][col]}!`;
//             gameBoard[row][col] = 'hit'
//             scoreSheetUpdate(ship.name, ship.cHit); //update the scoresheet
//             shipDestroyed(ship.name, ship.cHit); //see if the ship is destroyed
//           }
//         }
//       });
//     } else {
//       event.target.classList.add("miss"); //adds a miss to the grid and to the respectife players game board
//       if (turn === "p") {
//         cGameBoard[row][col] = 'miss';
//         instruct.innerHTML = `You missed.`;
//       }
//       if (turn === "c") {
//         pGameBoard[row][col] = 'miss';
//         instruct.innerHTML += `\n\nThe computer missed.`;
//       }
//     }
//     turn = turn === "p" ? "c" : "p"; //toggles the turn from player to computer and vice versa
//   }
//   cRandomGuesses();
// };

const pGuessHandler = (event) => {
  let cell = event.target; //grabs the cell that was clicked
  let row = Number(cell.id.substring(6,7)) //using the cells id, getting the row value
  let col = Number(cell.id.substring(8)) //using the cells id, getting the col
  if (cell.classList.contains('water')){   //if it has water it wasn't checked before
    instruct.innerHTML = ''; //clears the instruct display
    if (cell.classList.contains('ship')){ //if there is a ship was placed
      aHit(cell, cGameBoard[row][col]) //go to the hit logic
      cGameBoard[row][col] = 'hit' //add hit to the computer game board
    }
    else{
      aMiss(cell); //go to the miss logic
      cGameBoard[row][col] = 'miss' //
    }
  }
}

const aHit = (cell, shipName) => {
  cell.classList.add('hit'); //adds the class hit to change style
  cell.classList.remove('water'); //removes water class to show the cell has been checked
  ships.forEach((ship) => {
    if (shipName === ship.name){
      player = turn === 'p' ? 'You' : 'The computer' //changes the text based on whose turn it is
      instruct.innerHTML += `${player} hit a ${shipName}!`  //text to show player
      ship[turn+'Hit']++
      scoreSheetUpdate(shipName, ship[turn+'Hit'])
      shipDestroyed(ship.name, ship[turn+'Hit'])
    }
  })
}

const aMiss = (cell) => {
  cell.classList.add('miss');
  cell.classList.remove('water')
  player = turn === 'p' ? 'You' : 'The computer'
  instruct.innerHTML += `${player} missed!`
}

const shipDestroyed = (shipName, hits) => {
  ships.forEach((ship) => {  //looks through our ships array and checks on the object of the ship that was hit
    if (ship.name === shipName && ship.length === hits) { //if the amount of hits equals the length of the ship, it is sunk
      if (turn === "p") {
        instruct.innerHTML += `\n\nYou sunk the computer's ${shipName}!`;
        cTotalShips -= 1;  //keeps track of the ships for the game over condition
      }
      if (turn === "c") {
        instruct.innerHTML += `\n\nThe computer sunk your ${shipName}!`;
        pTotalShips -= 1; //keeps track of the ships for the game over condition
      }
    }
  });
  checkGameOver();
};

const cRandomGuesses = () => {
  if (turn === "c") {
    //makes sure it's the computers turn
    let randomIndex = Math.floor(Math.random() * 100); //picks a random number between 0-99
    let selectedCell = pGrid.childNodes[randomIndex]; //pick a cell using the random Index
    if (
      !(
        selectedCell.classList.contains("miss") || //checks to see if the cell has been clicked before
        selectedCell.classList.contains("hit")
      )
    ) {
      selectedCell.click(); //Chat-GPT //clicks the selected cell
      turn = turn === "c" ? "c" : "p"; //changes the turn to the player
    } else {
      cRandomGuesses();
    } //if a cell isn't clicked, because it was clicked already, run the function again
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
cGrid.addEventListener("click", (event) => pGuessHandler(event)); //Chat-GPT
pGrid.addEventListener("click", (event) => (event)); //Chat-GPT
gameBtn.addEventListener("click", (event) => {
  //ChatGPT
  if (!setUpComplete) startGame(event);
  else restartGame(event);
});
