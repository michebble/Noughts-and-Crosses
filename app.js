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
*/


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
  gameSquare.addEventListener('click', assignToken);
  gameSquare.className = 'square';
  gameSquare.setAttribute('data-id',i);
  gameBoard.appendChild(gameSquare);
}