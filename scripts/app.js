// let gameBoard =[]


const calculator = (() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
      add,
      sub,
      mul,
      div,
    };
  })();

  

const gameModule = (() => {

  // DOM cache
  const gameBoard = document.getElementById("game-board");
  const button = document.getElementById("a-button");
  const cells = document.getElementsByClassName('cell');
  
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

  // build so that I first choose X then O then X so on and so forth! 
  // Also, I need to keep track of which player just placed a marker
  // I can achieve this with a "current player" variable that tracsk which marker was just placed
  // then I can implement a check to see if X was placed, switch to O and vice versa 

  const renderDom = () => {
    gameBoard.innerHTML = "<h2>Hello There</h2>";
  }

  // bind events
  button.addEventListener('click', addMarkerToCell);  
  console.log(cells)
  

  // TODO: Add event listeners to all the cells
  let cellsArray = [...cells]
  cellsArray.forEach(cell => {
    cell.addEventListener('click', addMarkerToCell);
  });

  return {renderDom};

})();

/* 
PSEUDO CODE TIME: 
1. Cache the board dom (it's going to be a 3x3 board) 
2. Create a loop that fills the entire gameboard with X's and O's 
*/ 
