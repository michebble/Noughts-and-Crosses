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




*/
var scoreSheet = new Array(9).fill('');
var whichPlayer = 'X';

var playMove = function(currentPlayer, nextPlayer, squareId) {
  scoreSheet[squareId] = currentPlayer;
  whichPlayer = nextPlayer;
}

var chooseSpace = function(event){
  var squareId = Number(event.target.getAttribute('data-id'));
  if (whichPlayer === 'X') {
    playMove('X', 'O', squareId);
    //set image
    event.target.removeEventListener('click', chooseSpace);
    //check win conditions
  } else if (whichPlayer === 'O') {
    playMove('O','X', squareId);
    //setimage
    event.target.removeEventListener('click', chooseSpace);
    //check win condition
  }
  console.log(scoreSheet);
}





var assignToken = function(event) {
  event.target.style.backgroundImage = "url('https://www.fillmurray.com/" + event.target.clientHeight + "/" + event.target.clientWidth + "')";
}

//---presentation---//

/* 
get the elemets
-player 1
-player 2
-board


*/

var gameBoard = document.querySelector('.game-board');


for (var i = 0; i < 9; i++) {
  var gameSquare = document.createElement('div');
  gameSquare.addEventListener('click', chooseSpace);
  gameSquare.className = 'square';
  gameSquare.setAttribute('data-id',i);
  gameBoard.appendChild(gameSquare);
}


