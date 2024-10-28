# Tony's Battleship Game Proposal

## Project Description
My app is an adaptation of the classic board game Battleship. In the game, one human player will play against a computer player by trying to find the randomly placed ships on the computer boards while the computer tries to find the ships randomly placed for the player on their board. Both players have a collection of 5 ships 'deployed' to a number of cell locations on the players board based on the 'size' of the ship. Once all all cells for each of the 5 ships are located, that player loses.

## Wire Frame
#### Initial Setup

![Initial Setup Diagram](./assets/initial_setup_diagram.png 'Initial Setup Diagram')

## User Stories
#### MVP Goals
* As a player, I want to see the instructions of what I need to do next displayed.
* As a player, I want to see where my ships are randomly placed at the beginning of the game.
* As a player, I want the computer to place their ships randomly in legal cells.
* As a player, I want to see where the computer has guessed on my board and have it reflect whether it was a hit or a miss during the game.
* As a player, I want to be able to guess a cell by clicking on the cell on the computer board and have it reflect whether it was a hit or a miss during the game.
* As a player, I want the game to reflect when I have found all the cells for a computers ship (sunk a ship)
* As a player, I want the game to reflect when the computer has found all the cells for a ship I have placed.
* As a player, I want the game to show me I won once I have 'sunk' all the computers ships.
* As a player, I want the game to show me I lost once the computer has 'sunk' all of my ships.

#### Stretch Goals
* As a player, I want to be able to place my ships on my board during setup of the game and see where they have been placed during the playing of the game.
* The computer guesses are limited to possible ship locations after a ship has been found (instead of the computer continuing to randomly guess cells).
* The player can drag and drop their ships from the scoresheet to place their ships during setup.
* Adding sound when a ship is hit/missed, and when the player wins/losses

## Psuedocode

```
All catched Element variables
    displays
    player/computer grids
    player/computer scoresheets w/ships
    button

All variables declared or initialized
    player/computer game board
    size of grid and each ship
    ship arrays for player and computer

Functions

    grid setup {unsing nested for loops that creates gridsize by gridsize grid in HTML, giving each cell a unique location coordinate and content of 'water'}

    gameboard setup {using nested for loops to create a 2D array that holds the location and content for each HTML cell that was created}

    ship placement setup {using the appropriate ship array, place the ships by setting the location of each piece of the array to a cell on our grid, will also make sure that the cells are legal for each ship}

    update grid {reflect what is on the gameboard to the grid in html}

    update display {updates the display text to show the turn and the instructions to tell the user what to do next}

    player turn {player clicks on a cell on the computer grid
        if a ship is in the gameboard at the cell, represent a hit on the gameboard
        if a ship is not in the gameboard at the cell, represent a miss on the gameboard
        if all the cells for a ship have been hit, sink the ship by crossing out the name on the scoresheet}

    computer turn{computer picks a random cell,
        if a ship is in the gameboard at the cell, indicate a hit on the gameboard
        if a ship is not in the gameboard at the cell, indicate a miss on the gameboard
        if all cells for a ship have been hit, sink the ship by crossing out the name on the scoresheet}
    
    check win condition {if all 5 ships for the player or the computer have been sunk, trigger game over,
        if it was the players ships that were sunk, indicate a loss
        if it was the computers ships that were sunk, indicate a win}
    
    initial function {run all setup functions}

    gameplay {alternate between player and computer turn until there is a winner}
```
## Timeline

| Date           |Task                              |Notes  |
|---            |---                               |---    |
|Tues 10/29     |finish proposal and get approval  |       |
|Wed 10/30      |create initial state for the game including grid, gameboard and scoresheet |started but requires fine tuning  |
|Thur 10/31     |write randomization code for placing ships onto the gameboard  |don't need to be reflected on the grid yet   |
|Fri 11/1       |reflect ship placement on the player grid   |should not be shown on the computer grid |
|Sat 11/2       |write player turn logic  |                  |
|Sun 11/3       |finish player turn logic and start computer turn logic| needs to reflect hits and misses on grid  |
|Mon 11/4       |write win condition logic and verify a full game can be played| |
|Tues 11/5      |clean up game code and start stretch goals|    |
|Wed 11/6       |continue on stretch goals  | make sure that main branch has a working game    |
|Thur 11/7      |present final game |   |