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
var winningCombinations = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
var currentPlayersName = 'cross';
var crossRoundsWon = 0;
var noughtsRoundsWon = 0;
var drawnGames = 0;
var thisRoundsStartingAnimation = '';

var storeMove = function(currentPlayersName,  squareId) {
  playArea[squareId] = currentPlayersName;
}

var checkRow = function(position1, position2, position3) {
  if (playArea[position1] == 'emptySquare') {
    return false;
  } else if (playArea[position2] !== playArea[position3]) {
    return false;
  } else if (playArea[position1] === playArea[position3]) {
    return true;
  }  
}

var winCondition = function() {
  for (var possibleCombination = 0; possibleCombination < winningCombinations.length; possibleCombination++) {
    if (checkRow(winningCombinations[possibleCombination][0],winningCombinations[possibleCombination][1],winningCombinations[possibleCombination][2]) === true) {
      return true;
    }
  }
  return false;
}

var fillInScoreSheet = function() {
crossScoreSheet.textContent = crossRoundsWon;
noughtsScoreSheet.textContent = noughtsRoundsWon; 
}

var wonThreeGames = function(numberOfRoundsWon) {
  if (numberOfRoundsWon === 3) {
    return true;
  }
}

var assignPointsForRound = function(winner) {
  if (winner === 'cross') {
    crossRoundsWon += 1;
    fillInScoreSheet();
    
    wonThreeGames(crossRoundsWon);
  } else if (winner === 'nought') {
    noughtsRoundsWon += 1;
    fillInScoreSheet();
    
    wonThreeGames(noughtsRoundsWon);
  } else if (winner === 'none') {
    drawnGames += 1;
    wonThreeGames(drawnGames);
  }

  setTimeout(clearBoard, 1000);
}


var placePlayerSymbol = function(symbolName) {
  var playerImage = document.createElement('img');
  playerImage.src = symbolName +'.png';
  event.target.appendChild(playerImage);
  event.target.classList.remove(thisRoundsStartingAnimation);
  event.target.classList.add('jello');
  event.target.removeEventListener('click', activeSquare);
}

var disableBoard = function() {
  var squareToDisable = document.querySelectorAll('.square');
  for (var i =0; i < 9; i++) {
    squareToDisable[i].removeEventListener('click', activeSquare);
  }
}

var claimSquare = function (currentPlayersName, squareId) {
  storeMove(currentPlayersName, squareId);
  placePlayerSymbol(currentPlayersName);
}

var isGameOver = function(currentPlayersName) {
  if (winCondition() === true) {
    disableBoard();
    assignPointsForRound(currentPlayersName);
  } else if (winCondition() === false && playArea.indexOf('emptySquare') === -1) {
    assignPointsForRound('none');
  } 
}

var activeSquare = function(event){
  var squareId = Number(event.target.getAttribute('data-id'));
  if (currentPlayersName === 'cross') {
    claimSquare(currentPlayersName, squareId);
    isGameOver(currentPlayersName);
    currentPlayersName = 'nought';
  } else if (currentPlayersName === 'nought') {
    claimSquare(currentPlayersName, squareId);
    isGameOver(currentPlayersName);
    currentPlayersName = 'cross';
  }
  setCommentryMessage(currentPlayersName + "'s turn.")
}
//  (playArea.indexOf('emptySquare') === -1)

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
var crossScoreSheet = document.querySelector('.player-ones-area');
var noughtsScoreSheet = document.querySelector('.player-twos-area');
var commentryBox = document.querySelector('.game-commentry');

crossScoreSheet.textContent = 0;
noughtsScoreSheet.textContent = 0;
commentryBox.textContent = 'First to 3 games wins.';

var randomAnimation = function() {
  var animations = ['rotateIn','bounceIn', 'flipInX','flipInX','zoomIn']
  return animations[Math.floor(Math.random() * animations.length)]
}

var setCommentryMessage = function (message) {
  commentryBox.textContent = message;
}

var createBoard = function() {
  playArea = new Array(9).fill('emptySquare');
  thisRoundsStartingAnimation = randomAnimation();
  for (var i = 0; i < 9; i++) {
    var gameSquare = document.createElement('div');
    gameSquare.addEventListener('click', activeSquare);
    gameSquare.className = 'square';
    gameSquare.setAttribute('data-id',i);
    gameSquare.classList.add('animated');
    gameSquare.classList.add(thisRoundsStartingAnimation);
    gameBoard.appendChild(gameSquare);
  }
}

var resetGame = function () {
  crossScoreSheet.textContent = 0;
  noughtsScoreSheet.textContent = 0;
  crossRoundsWon = 0;
  noughtsRoundsWon = 0;
  drawnGames = 0;
  currentPlayersName = 'cross';
}

var removeSquares = function() {
  var squaresToClear = document.querySelectorAll('.square');
  for (var i = 0; i < 9; i++) {
    gameBoard.removeChild(squaresToClear[i]);
  }
}

var clearBoard =function() {
  removeSquares();
  if (wonThreeGames(crossRoundsWon) || wonThreeGames(noughtsRoundsWon) || wonThreeGames(drawnGames)) {
    resetGame();
    setCommentryMessage(currentPlayersName + ' is the winner!')
    setGameMessage('Play again?')
    gameBoard.addEventListener('click', startNewGame);
  } else {
    setGameMessage(currentPlayersName + ' lost the round!');
    setTimeout(removeGameMessage, 3000);
    setTimeout(createBoard, 3000);
  }
}

var removeGameMessage = function() {
  var messageToRemove = document.querySelector('.center-message');
  gameBoard.removeChild(messageToRemove);
}

var startNewGame = function () {
  removeGameMessage();
  gameBoard.removeEventListener('click', startNewGame);
  createBoard();
  setCommentryMessage(currentPlayersName + "'s turn.");
}

var setGameMessage = function (noticeText) {
  var messageBoard = document.createElement('div');
  messageBoard.className = 'center-message';
  messageBoard.textContent = noticeText;
  gameBoard.appendChild(messageBoard);
}

setGameMessage('click here to play!')
gameBoard.addEventListener('click', startNewGame);
