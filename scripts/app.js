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

  const init = () => {
    domChache();
    bindEvents();
  }
  const domChache = () => {
    this.gameBoard = document.getElementById("game-board");
    this.button = document.getElementById("a-button");
    console.log(this.button)
  }

  const bindEvents = () => {
    this.button.addEventListener('click', saySomething);
  }

  const saySomething = () => {
    console.log("Hello there my old friend")
  }

  const renderDom = () => {
    this.gameBoard.innerHTML = "<h2>Hello There</h2>";
  }
  init();
  return {renderDom};

})();

/* 
PSEUDO CODE TIME: 
1. Cache the board dom (it's going to be a 3x3 board) 
2. Create a loop that fills the entire gameboard with X's and O's 
*/ 
