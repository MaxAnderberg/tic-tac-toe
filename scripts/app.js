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
  const winner_message = document.querySelector(".winner-message")
  const winner_message_text = document.querySelector("[data-winning-text]")

  // resets the game board to blank
  // currently it is just removing the inner html to blank
  // might change this in the future
  const resetBoard = (e) => {
    // TODO: need to connect this to a button
    cellsArray.forEach(element => {
      element.innerHTML = "";
      currentPlayer = "";
      winner_message.classList.remove("show");
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

  // switches between X and O
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

  // adds either X or O to a cell
  const addMarkerToCell = (e) => {
    // checks if a marker is already in the cell
    if (e.target.innerHTML) {
      return; // if there is mark in the cell, exit out
    } else {
      e.target.innerHTML = switchPlayerTurn();
      // check if we have a winner
      if(checkWinner(currentPlayer)){
        winner_message_text.innerHTML = `The winner is ${currentPlayer}!`
        winner_message.classList.add("show")
      }
    }
  }

  // // bind events
  // button.addEventListener('click', addMarkerToCell, {
  //   once: true
  // });

  // adding eventlisteners to all the cells
  cellsArray.forEach(cell => {
    cell.addEventListener('click', addMarkerToCell);
  });

  // checks if there is a winner for current placed marker
  const checkWinner = (currentMarker) => {
    return win_conditions.some(combination => {
      return combination.every(index => {
        return cells[index].innerHTML.includes(currentMarker);
      })
    })
  }

  return {
    resetBoard,
  };

})();