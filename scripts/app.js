const playerFactory = (id, name, marker, human, start, myTurn) => {
  return {
    id,
    name,
    marker,
    human,
    start,
    myTurn
  }
};

const boardModule = (() => {

  // DOM cache
  const gameBoard = document.getElementById("game-board");
  const cell_selector = "[data-cell]" // set the selector for getting the tic tac toe cells
  const cells = document.querySelectorAll(cell_selector); // fetch the cells
  const cellsArray = [...cells] // converst node list to array
  const winner_message = document.querySelector(".winner-message")
  const winner_message_text = document.querySelector("[data-winning-text]")

  // resets the game board to blank
  const resetBoard = (e) => {
    cellsArray.forEach(element => {
      element.innerHTML = "";
      element.classList.remove("taken");
      currentPlayer = "";
      winner_message.classList.remove("show");
      player1.start = true;
      player1.myTurn = false;
      player2.myTurn = false;
      
    });
  }

  // adds either X or O to a cell
  const addMarkerToCell = (e) => {
    // checks if a marker is already in the cell
    if (e.target.innerHTML) {
      return; // exit out if there is mark in the cell
    } else {

        gameModule.playOneRound();
        // e.target.classList.add("taken");

        // winner_message_text.innerHTML = `Player${currentPlayer.id} as ${currentPlayer.marker} wins!`
        // winner_message.classList.add("show")

        // winner_message_text.innerHTML = `It's a tie! Try again`
        // winner_message.classList.add("show")
    }
  }

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

// TODO: migrate some of the game related logic from boardModule to here  
const gameModule = (() => {

  let turnCounter = 0;

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
  ];

  // set up players
  const player1 = playerFactory(1,'Max', 'X', true, true, false);
  const player2 = playerFactory(2,'Alter Ego', 'O', true, false, false);
  let currentPlayer;

/*
  * Handle PvP or PvE
    * Create the players in here based on PvP or PvE
  * Handle player turn
  It needs to handle all of these and then feed the board module which only job is to display
  interactive parts of the game
*/

  const playOneRound = () => {
    playerTurn();  
    handleWinOrTie();
  }

  const handleWinOrTie = () => {
    // check if we have a winner
    if (checkWinner(currentPlayer.marker)) {
      return currentPlayer;
    // check for tie
    } else if(!checkWinner(currentPlayer.marker) && turnCounter === 9){
      return "tie";
    }

  };

    // checks if there is a winner for current placed marker
    const checkWinner = (currentMarker) => {
      return win_conditions.some(combination => {
        return combination.every(index => {
          return cells[index].innerHTML.includes(currentMarker);
        })
      })
    }

    const playerTurn = () => {
    if (player1.start) {
      player1.start = false; // remove the start privilege
      player2.myTurn = true; // set player 2s turn
      currentPlayer = player1;
    } else if (player2.myTurn) {
      player1.myTurn = true;
      player2.myTurn = false;
      currentPlayer = player2;
    } else if (player1.myTurn) {
      player1.myTurn = false;
      player2.myTurn = true;
      currentPlayer = player1;
    }
    turnCounter++;
  }

  const setVsHumanOrComputer = (flag) => {
    // need to get the flag from the Tic Tac Toe game
    return;
  }

  // simple AI
  // pick a non picked spot and add its marker
  const easyAI = () => {
    cellsArray.forEach(element => {
      if(element.innerHTML){
        return; // if there is already a marker choose another
      } else {
        element.innerHTML = player2.marker; // currently player2 is hardcoded
      }
    });  
  }

  // make a medium "difficulty" where the ai chooses randomly a spot on the board

  return {playOneRound};
})()