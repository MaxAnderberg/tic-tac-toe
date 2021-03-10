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

const gameModule = (() => {

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
    console.log("Hello there my old friend")
    console.log(e)
    e.target.innerHTML = switchPlayerTurn();
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

/* 
PSEUDO CODE TIME: 
1. Cache the board dom (it's going to be a 3x3 board) 
2. Create a loop that fills the entire gameboard with X's and O's 
*/ 
