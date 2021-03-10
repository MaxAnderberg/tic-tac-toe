// let gameBoard =[]

/* 
  We need three major functions: 
    1. a player creator
    2. A module that handles the board - rendering etc. 
      keep track of how many markers have been placed, probably have a counter or something
    3. A module that handles the flow of the game, keeps track of winner etc. 
      handle who winns and looses
      restart game
*/

const playerFactory = (name, marker) => {
  return {name, marker}
};

const boardModule = (() => {

  // DOM cache
  const gameBoard = document.getElementById("game-board");
  const button = document.getElementById("a-button");
  const cells = document.getElementsByClassName('cell');
  const cellsArray = [...cells] // converst node list to array

  /* 
  TODO:
  I need to build a reset board function 
  */

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
  let players = ['X','O']
  let currentPlayer = "" 

  const switchPlayerTurn = () => {
    if(currentPlayer === ""){
      return currentPlayer = 'X'
    } else if (currentPlayer === 'X'){
      return currentPlayer = 'O'
    } else {
      return currentPlayer = 'X'
    }
  }

  const addMarkerToCell = (e) => {
    if(gameModule.getMarkCount() <= 9){
      // checks if a marker is already in the cell
      if(e.target.innerHTML){
        return; // if there is mark exit out
      } else {
        e.target.innerHTML = switchPlayerTurn();
        gameModule.increaseMarkCounter();
      }
    } 
  }

  const renderDom = () => {
    gameBoard.innerHTML = "<h2>Hello There</h2>";
  }

  // bind events
  button.addEventListener('click', addMarkerToCell);  
  console.log(cells)
  

  // adding eventlisteners to all the cells
  cellsArray.forEach(cell => {
    cell.addEventListener('click', addMarkerToCell);
  });

  return {renderDom, resetBoard};

})();

const gameModule = (() => {
  let markCounter = 0;

  const increaseMarkCounter = () => {
    markCounter++
  }

  const getMarkCount = () => {
    return markCounter;
  }

  return {getMarkCount, increaseMarkCounter}

})();

/* 
PSEUDO CODE TIME: 
1. Cache the board dom (it's going to be a 3x3 board) 
2. Create a loop that fills the entire gameboard with X's and O's 
*/ 
