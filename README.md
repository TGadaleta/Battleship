# Tony G's Battleship!!!

## Description
This is a custom built, digital version of the board game Battleship. In this version, the user player and the computer player place five ships of varying lengths randomly in a 10x10 grid and then take turns trying to guess the locations of the ships. The computer's logic starts by guessing randomly, until it makes a hit. Then its logic keeps the computer guessing around the hit until the ship is destroyed.  I chose this game as I wanted a challenge for my first project.

#### URL
[Game deployed on Netlify](https://tony-gadaleta-battleship.netlify.app/)

#### Technologies Used
* Javascript
* HTML
* CSS

## Screenshot - Game Over

![Game Over Display](./assets/Game_Over_Screenshot.png 'Game Over Screenshot')

## Instructions

To start a game, click the Start Game button in the middle of the screen. This will randomly place ships on your board and the computer's board. You can see the ships placed on your board while the ships placed on the computer's board are hidden. Then, take your turn by clicking on any cell on the computer's board. This will guess that cell, which will then show if there is a ship there (a hit in red) or if there isn't a ship there (a miss in gray). A hit will also register on the scoresheet below each board. The computer will automatically take a guess. Results for each guess will be displayed in the instructions box in the middle of the screen. Continue to guess cells until you have found all the computer's ships or until the computer has found all of yours. You can also restart the game at any time by clicking the Restart Game button.

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