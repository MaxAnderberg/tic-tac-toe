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

const boardDOM = (() => {
    // DOM cache object
    const cells = document.querySelectorAll("[data-cell]"); // fetch the cells
    const cellsArray = [...cells] // convert node list to array

  const board = {
    cells:cells,
    cellsArray:cellsArray,
    winner_message:document.querySelector(".winner-message"),
    winner_message_text:document.querySelector("[data-winning-text]"),
    starting_message:document.querySelector(".starting-message.show")

  }

  return {board}

})()

const gameModule = (() => {

  let turnCounter = 0;
  let gameState;

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
  let player1; 
  let player2;
  let currentPlayer;

/*
  * Handle PvP or PvE
    * Create the players in here based on PvP or PvE
*/

const playOneRound = () => {

  playerTurn();
  const currentPlayer = getCurrentPlayer();
  boardModule.addMarkerToCell(event, currentPlayer);

  gameModule.handleWinOrTie();

  let gameState = getWinner();

  if(gameState == true){
    boardModule.showWinnerMessage(currentPlayer);
  } else if (gameState === "tie"){
    boardModule.showTieMessage();
  }
}

  const getCurrentPlayer = () => {
    return currentPlayer;
  }

  const handleWinOrTie = () => {
    // check if we have a winner
    if (checkWinner(currentPlayer.marker)) {
      setWinner(true);

    // check for tie
    } else if(!checkWinner(currentPlayer.marker) && turnCounter === 9){
      setWinner("tie");
    }
  };

    // checks if there is a winner for current placed marker
    const checkWinner = (currentMarker) => {
      return win_conditions.some(combination => {
        return combination.every(index => {
          return boardDOM.board.cells[index].innerHTML.includes(currentMarker);
        })
      })
    }

  const getWinner = () => {
    return gameState;
  }  

  const setWinner = (yes) => {
    gameState = yes;
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

  // create players based on the players choice
  const chooseOpponent = (flag) => {
    if(flag === "human") {
      player1 = playerFactory(1,'Max', 'X', true, true, false);
      player2 = playerFactory(2,'Alter Ego', 'O', true, false, false);

    }
    // remove the set up screen
    boardDOM.board.starting_message.classList.remove("show")
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

  const resetPlayerSettings = () => {
    player1.start = true;
    player1.myTurn = false;
    player2.myTurn = false;
    currentPlayer = "";
    gameState = false;
    turnCounter = 0;
  }

  return {playOneRound, handleWinOrTie, resetPlayerSettings, chooseOpponent};
})()

const boardModule = (() => {

  const backButton = () => {
    resetGame();
    boardDOM.board.starting_message.classList.add("show")
  }

  const resetGame = () => {
    resetBoard(event);
    gameModule.resetPlayerSettings();

  }

  // resets the game board to blank
  const resetBoard = (e) => {
    boardDOM.board.cellsArray.forEach(element => {
      element.innerHTML = "";
      element.classList.remove("taken");
      boardDOM.board.winner_message.classList.remove("show");
    });
  }

  const showWinnerMessage = (currentPlayer) => {
    console.log(boardDOM.board.winner_message)
    boardDOM.board.winner_message.classList.add("show");
    boardDOM.board.winner_message_text.innerHTML = `Player${currentPlayer.id} as ${currentPlayer.marker} wins!`
  }

  const showTieMessage = () => {
    boardDOM.board.winner_message.classList.add("show");
    boardDOM.board.winner_message_text.innerHTML = `It's a tie! Try again`
  }

  // adds either X or O to a cell
  const addMarkerToCell = (e, currentPlayer) => {
    // checks if a marker is already in the cell
    if (e.target.innerHTML) {
      return; // exit out if there is mark in the cell
    } else {
        e.target.innerHTML = currentPlayer.marker;
        e.target.classList.add("taken");
    }
  };

  // adding eventlisteners to all the cells
  boardDOM.board.cellsArray.forEach(cell => {
    cell.addEventListener('click', gameModule.playOneRound);
  });

  return {
    resetGame,
    addMarkerToCell,
    showWinnerMessage,
    showTieMessage,
    backButton
  };

})();

