// let gameBoard =[]

/* 
  We need three major functions: 
    1. a player creator - CHECK
    2. A module that handles the board - rendering etc. - CHECK
      keep track of how many markers have been placed, probably have a counter or something
    3. A module that handles the flow of the game, keeps track of winner etc. 
      handle who winns and looses
      restart game
*/

const playerFactory = (name, marker) => {
  return {
    name,
    marker
  }
};

const boardModule = (() => {

  /* 
    TODO: 
    Need an array where we store all the results
    Array should have a length of 9 as the board is 3 by 3
  */


  // instantiate board array

  // DOM cache
  const gameBoard = document.getElementById("game-board");
  const button = document.getElementById("a-button");
  const cell_selector = "[data-cell]"
  const cells = document.querySelectorAll(cell_selector);
  const cellsArray = [...cells] // converst node list to array

  // resets the game board to blank
  // currently it is just removing the inner html to blank
  // might change this in the future
  const resetBoard = (e) => {
    // TODO: I need to add so that when I reset the board I also reset the mark count
    cellsArray.forEach(element => {
      element.innerHTML = ""
    });
  }

  // set up players
  let players = ['X', 'O']
  let currentPlayer = ""

  const switchPlayerTurn = () => {
    if (currentPlayer === "") {
      return currentPlayer = 'X'
    } else if (currentPlayer === 'X') {
      return currentPlayer = 'O'
    } else {
      return currentPlayer = 'X'
    }
  }

  const addMarkerToCell = (e) => {
    
      // checks if a marker is already in the cell
      if (e.target.innerHTML) {
        return; // if there is mark in the cell, exit out
      } else {
        e.target.innerHTML = switchPlayerTurn();
        gameModule.increaseMarkCounter();
      }
    
  }

  // TODO: Make this renderboard later on
  const renderDom = () => {
    gameBoard.innerHTML = "<h2>Hello There</h2>";
  }

  // bind events
  button.addEventListener('click', addMarkerToCell, {once: true});

  // adding eventlisteners to all the cells
  cellsArray.forEach(cell => {
    cell.addEventListener('click', addMarkerToCell);
  });

  const checkWinner = () => {
    return;
  }

  return {
    renderDom,
    resetBoard,
    checkWinner
  };

})();

const gameModule = (() => {

  return;

})();
