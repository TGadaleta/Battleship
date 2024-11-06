# Tony G's Battleship!!!

## Description
This is a custom-built, digital version of the board game Battleship. In this version, both the user and the computer player place five ships of varying lengths randomly on a 10x10 grid. The players then take turns trying to guess the locations of each other's ships. The computer begins by guessing randomly until it makes a hit, after which it guesses strategically around the hit until the ship is destroyed. I chose this game as a challenge for my first project.

#### URL:  [Game deployed on Netlify](https://tony-gadaleta-battleship.netlify.app/)

#### Technologies Used
* Javascript
* HTML
* CSS
* ChatGPT

## Screenshot - Game Over

![Game Over Display](./assets/Game_Over_Screenshot.png 'Game Over Screenshot')

## Instructions

To start a game, click the "Start Game" button in the middle of the screen. This will randomly place ships on both your board and the computer's board. You can see the ships on your board, while the computer’s ships remain hidden. Take your turn by clicking any cell on the computer’s board to guess that cell. Hits are marked in red, and misses are marked in gray. A hit will also register on the scoresheet below each board. The computer will automatically take a guess in response, and results for each guess are displayed in the instructions box in the middle of the screen. Continue to guess cells until you have located all the computer's ships, or until the computer has located all of yours. You can restart the game anytime by clicking the "Restart Game" button.

## MVPs and Stretch Goals
#### MVPs
*  As a player, I want to see the instructions of what I need to do next displayed.
* As a player, I want to see where my ships are randomly placed at the beginning of the game.
* As a player, I want the computer to place their ships randomly in legal cells.
* As a player, I want to see where the computer has guessed on my board and have it reflect whether it was a hit or a miss during the game.
* As a player, I want to be able to guess a cell by clicking on the cell on the computer board and have it reflect whether it was a hit or a miss during the game.
* As a player, I want the game to reflect when I have found all the cells for a computers ship (sunk a ship)
* As a player, I want the game to reflect when the computer has found all the cells for a ship I have placed.
* As a player, I want the game to show me I won once I have 'sunk' all the computers ships.
* As a player, I want the game to show me I lost once the computer has 'sunk' all of my ships.

#### Stretch Goals (Completed)
* The computer guesses are limited to possible ship locations after a ship has been found (instead of the computer continuing to randomly guess cells).

#### Stretch Goals (Incomplete)
* As a player, I want to be able to place my ships on my board during setup of the game and see where they have been placed during the playing of the game.
* The player can drag and drop their ships from the scoresheet to place their ships during setup.
* Adding sound when a ship is hit/missed, and when the player wins/losses

## Development Process
#### Overview

The development of the Battleship game focused on building an interactive and enjoyable single-player experience. Key phases included planning, designing the game board, implementing game logic with a focus on an intelligent computer move strategy, and refining the project based on testing and user feedback.

#### Phase 1: Planning
1. Define Requirements:

    Create a single-player Battleship game where the user plays against the computer.
    Implement a grid-based board with clear indicators for hits, misses, and sunk ships.
    Develop an intelligent computer move algorithm, where the computer makes strategic guesses based on previous hits.
2. Project Structure:

    Set up separate files for HTML (structure), CSS (styling), and JavaScript (game logic).
    Outline the core functions needed for game setup, move handling, tracking hits and misses, and the computer's move algorithm.
3. Research:

    Researched methods for implementing an intelligent guessing algorithm to allow the computer to respond dynamically to previous guesses.

#### Phase 2: Design
1. UI/UX Design:

    Designed a visually simple, grid-based game board with intuitive indicators for player actions and feedback on the computer’s moves.
    Used color and visual cues to indicate hits, misses, and ship positions when sunk.

2. Wireframing:

    Sketched a layout with a board grid for the player and the computer, along with indicators for tracking the current status of each ship (scoreboard).

#### Phase 3: Implementation
1. HTML Structure:

    Built the game board using HTML, with a grid structure for each player’s board. Each cell represented a potential hit location.
    Added buttons for actions like starting a new game and resetting the board.
2. CSS Styling:

    Styled the grid to make it visually appealing, with distinct colors for hits, misses, and unchecked cells.
3. JavaScript Functionality:

    Game Initialization:
        Created functions to create a grid and gameboard for each player and randomly place ships on the computer’s and player's grid.
    
    Move Handling:
        Implemented functions to register player moves when they click on a cell, with feedback for hits or misses using CSS classes.
    
    Intelligent Computer Move Algorithm:
        Developed an algorithm that allows the computer to make educated guesses. The computer "remembers" prior hits and makes targeted guesses around those points to attempt to sink the ship.
        Used CSS classes to track the computer’s hits and misses directly on the game board.
    
    End Game Logic:
        Added logic to detect when all ships have been sunk and display the game outcome.

#### Phase 4: Testing and Refinement

1. Initial Testing:

    Tested each core function separately, including ship placement, player guess handling, and the computer’s
    guess algorithm.

    Debugged issues related to the computer’s guessing, ensuring it didn’t make redundant moves or miss opportunities to sink ships.

2. User Testing

    Needed to make the players grid unclickable so that the games logic worked correctly.

#### Phase 5: Documentation and Deployment
1. Documentation:

    Added comments throughout the JavaScript code to explain the functionality of key sections, especially the intelligent computer move algorithm.
    
    Wrote this README file to guide users through the game’s setup and explain the development process in detail.

2. Deployment:

    Deployed to Netify to open testing to the public.