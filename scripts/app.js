// let gameBoard =[]



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
  const cell_selector = "[data-cell]" // set the selector for getting the tic tac toe cells
  const cells = document.querySelectorAll(cell_selector); // fetch the cells
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

  // possible winning combinations
  const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]


  const switchPlayerTurn = () => {
    // if a marker hasn't been played yet, set X
    if (currentPlayer === "") {
      return currentPlayer = 'X'
    } else if (currentPlayer === 'X') {
      return currentPlayer = 'O'
    } else {
      return currentPlayer = 'X'
    }
  }

  // 
  const addMarkerToCell = (e) => {
    // checks if a marker is already in the cell
    if (e.target.innerHTML) {
      return; // if there is mark in the cell, exit out
    } else {
      e.target.innerHTML = switchPlayerTurn();
      // check if we have a winner - TODO: Finish the checkWinner function
      if(checkWinner(currentPlayer)){ 
        console.log("winner")
      }
    }
  }

  // TODO: Make this renderboard later on
  const renderDom = () => {
    gameBoard.innerHTML = "<h2>Hello There</h2>";
  }

  // bind events
  button.addEventListener('click', addMarkerToCell, {
    once: true
  });

  // adding eventlisteners to all the cells
  cellsArray.forEach(cell => {
    cell.addEventListener('click', addMarkerToCell);
  });

  // TODO: finish the checkWinner function
  const checkWinner = (currentMarker) => {
    win_conditions.some(combination => {
      combination.every(index => {
        console.log(cellsArray[index].innerHTML.includes('X'))
        return cells[index].innerHTML.includes(currentMarker);
      })
    })
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
