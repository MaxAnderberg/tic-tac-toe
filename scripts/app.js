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

const oneAIRound = () => {
  playerTurn();
  const currentPlayer = getCurrentPlayer();
  easyAI();

  
  gameModule.handleWinOrTie();

  let gameState = getWinner();
  
  if(gameState == true){
    boardModule.showWinnerMessage(currentPlayer);
  } else if (gameState === "tie"){
    boardModule.showTieMessage();
  }
}

// playes one round, if playing vs computer it handles the computers round as well
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
  if(!player2.human && !gameState){
    oneAIRound();
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
      console.log(currentMarker);
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
      
    } else if (flag === "easyComputer"){
      player1 = playerFactory(1,'Max', 'X', true, true, false);
      player2 = playerFactory(2,'Alter Ego', 'O', false, false, false);
    } else if (flag === "hardComputer"){
      console.log("hard computer pressed");
    }
    // remove the set up screen
    boardDOM.board.starting_message.classList.remove("show")
  }

  // simple AI - randomize a spot on the board where it places the marker 
  const easyAI = () => {
   currentPlayer = player2;
   let rando;
   let tmp = [];
   for (let index = 0; index < boardDOM.board.cellsArray.length; index++) {
    const element = boardDOM.board.cellsArray[index];

     if (element.innerHTML === "" ) {
      tmp.push(element);
     }
   }

   // if only one board spot left place it there, otherwise randomize 
   if(tmp.length === 1){
    rando = 0;
   } else {
    rando = Math.floor(Math.random() * tmp.length);
   }
   // if there is atleast one available spot on the board, place a marker
   if(tmp.length >= 1){
     tmp[rando].innerHTML = currentPlayer.marker;
     tmp[rando].classList.add("taken")
     tmp[rando].removeEventListener('click', gameModule.playOneRound); // removes the eventlistener for the cell that the computer selected

   }
  }

  // this is going to be minimax algo
  // super duper hard
  const hardAI = () => {
    return;
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

  return {playOneRound, handleWinOrTie, resetPlayerSettings, chooseOpponent, easyAI};
})()

const boardModule = (() => {

  const backButton = () => {
    resetGame();
    boardDOM.board.starting_message.classList.add("show")
  }

  const resetGame = () => {
    resetBoard(event);
    gameModule.resetPlayerSettings();
    removeListenerFromCells();
    addEventlistener();

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

  // adding event listeners to all the cells
  const addEventlistener = () => {
    boardDOM.board.cellsArray.forEach(cell => {
      cell.addEventListener('click', gameModule.playOneRound,{once:true});
    })
  };

  // removes the event listeners
  const removeListenerFromCells = () => {
    boardDOM.board.cellsArray.forEach(cell => {
      cell.removeEventListener('click', gameModule.playOneRound);
    })
  }
  // add eventlisteners directly, can't be an IIFE as I need to call it in the reset function as well
  addEventlistener();

  return {
    resetGame,
    addMarkerToCell,
    showWinnerMessage,
    showTieMessage,
    backButton,
    addEventListener
  };

})();

