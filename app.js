console.log('Tic Tac Toe');

//---Game Logic---//

/* 
have toggle for player 1 and 2

**game loop**
player clicks board section
if that section is free, then player token appears
check win conditon
if there are three player tokens in a row, then player wins
if not, toggle player and return to start of loop

gameboard

0|1|2
-----
3|4|5
-----
6|7|8

places to check for win
      offset
0,1,2|1
0,3,6|3
0,4,8|4
1,4,7|3
2,4,6|2
2,5,8|3
3,4,5|1
6,7,8|1



*/


var playArea = new Array(9).fill('emptySquare');
var whichPlayer = 'cross';

var playMove = function(currentPlayer,  squareId) {
  playArea[squareId] = currentPlayer;
}

var checkRow = function(position1, position2, position3) {
  if (playArea[position1] == "") {
    return false;
  } else if (playArea[position2] !== playArea[position3]) {
    return false;
  } else if (playArea[position1] === playArea[position3]) {
    return true;
  }  
}

var winCondition = function() {
  if (checkRow(0,1,2) === true) {
    return true;
  } else if (checkRow(0,3,6) === true) {
    return true;
  } else if (checkRow(0,4,8) === true) {
    return true;
  } else if (checkRow(1,4,7) === true) {
    return true;
  } else if (checkRow(2,4,6) === true) {
    return true;
  } else if (checkRow(2,5,8) === true) {
    return true;
  } else if (checkRow(3,4,5) === true) {
    return true;
  } else if (checkRow(6,7,8) === true) {
    return true;
  } else if (playArea.indexOf('emptySquare') === -1){
    console.log('no one won')
    return false 
  } else {
    return false;
  }
}

var tallyPoints = function(winner) {
  var scoreOne = document.createElement('div');
  scoreOne.textContent = '1';
  var scoreZero = document.createElement('div');
  scoreZero.textContent = '0';
  if (winner === 'cross') {
    playerOnesArea.appendChild(scoreOne);
    playerTwosArea.appendChild(scoreZero);
  } else if (winner === 'naught') {
    playerTwosArea.appendChild(scoreOne);
    playerOnesArea.appendChild(scoreZero);
  }

  setTimeout(clearBoard, 1000);
}

var placeMark = function(markName) {
  event.target.style.backgroundImage = "url('" + markName + ".png')";
  event.target.style.backgroundSize = "contain"; 
  event.target.classList.remove('rotateIn');
  event.target.classList.add('jello');
  event.target.removeEventListener('click', chooseSpace);
}



var disableBoard = function() {
  var squareToDisable = document.querySelectorAll('.square');
  for (var i =0; i < 9; i++) {
    squareToDisable[i].removeEventListener('click', chooseSpace);
  }
}

var chooseSpace = function(event){
  var squareId = Number(event.target.getAttribute('data-id'));
  if (whichPlayer === 'cross') {
    playMove(whichPlayer, squareId);
    placeMark(whichPlayer);
    if (winCondition() === true) {
      disableBoard();
      tallyPoints(whichPlayer);
    }
    whichPlayer = 'naught';
  } else if (whichPlayer === 'naught') {
    playMove(whichPlayer, squareId);
    placeMark(whichPlayer);
    if (winCondition() === true) {
      disableBoard();
      tallyPoints(whichPlayer);
    }
    whichPlayer = 'cross';
  }
  console.log(playArea);
}


// var assignToken = function(event) {
//   event.target.style.backgroundImage = "url('https://www.fillmurray.com/" + event.target.clientHeight + "/" + event.target.clientWidth + "')";
// }

//---presentation---//

/* 
get the elemets
-player 1
-player 2
-board


*/



var gameBoard = document.querySelector('.game-board');
var playerOnesArea = document.querySelector('.player-ones-area');
var playerTwosArea = document.querySelector('.player-twos-area');

var createBoard = function() {
  for (var i = 0; i < 9; i++) {
    var gameSquare = document.createElement('div');
    gameSquare.addEventListener('click', chooseSpace);
    gameSquare.className = 'square';
    gameSquare.setAttribute('data-id',i);
    gameSquare.classList.add('animated');
    gameSquare.classList.add('rotateIn');
    gameBoard.appendChild(gameSquare);
  }
}

var clearBoard =function() {
  var squaresToClear = document.querySelectorAll('.square');
  for (var i = 0; i < 9; i++) {
    gameBoard.removeChild(squaresToClear[i]);
  }
  playArea = new Array(9).fill('emptySquare');
  // whichPlayer = 'cross';
  createBoard();
}
createBoard();