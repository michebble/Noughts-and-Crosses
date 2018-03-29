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
var naughtsRoundsWon = 0;
var drawnGames = 0;

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

var fillInScoreSheet = function(crossPoint, naughtsPoint) {
  var crossScoreForRound = document.createElement('div');
  crossScoreForRound.textContent = crossPoint;
  crossScoreSheet.appendChild(crossScoreForRound);
  var naughtsScoreForRound = document.createElement('div');
  naughtsScoreForRound.textContent = naughtsPoint;
  naughtsScoreSheet.appendChild(naughtsScoreForRound);  
}

var wonThreeGames = function(numberOfRoundsWon) {
  if (numberOfRoundsWon === 3) {
    return true;
  }
}

var assignPointsForRound = function(winner) {
  if (winner === 'cross') {
    fillInScoreSheet('1','0');
    crossRoundsWon += 1;
    wonThreeGames(crossRoundsWon);
  } else if (winner === 'naught') {
    fillInScoreSheet('0','1');
    naughtsRoundsWon += 1;
    wonThreeGames(naughtsRoundsWon);
  } else if (winner === 'none') {
    fillInScoreSheet('0','0');
    drawnGames += 1;
    wonThreeGames(drawnGames);
  }
  setTimeout(clearBoard, 1000);
}

var placePlayerSymbol = function(symbolName) {
  event.target.style.backgroundImage = "url('" + symbolName + ".png')";
  event.target.style.backgroundSize = "contain"; 
  event.target.classList.remove('rotateIn');
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
    currentPlayersName = 'naught';
  } else if (currentPlayersName === 'naught') {
    claimSquare(currentPlayersName, squareId);
    isGameOver(currentPlayersName);
    currentPlayersName = 'cross';
  }
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
var naughtsScoreSheet = document.querySelector('.player-twos-area');
var newGameBtn = document.querySelector('.new-game-btn');
var bonusBtn = document.querySelector('.bonus-btn');
var gameMessage = document.querySelector('.game-message');

var createBoard = function() {
  playArea = new Array(9).fill('emptySquare');
  newGameBtn.disabled = true;
  for (var i = 0; i < 9; i++) {
    var gameSquare = document.createElement('div');
    gameSquare.addEventListener('click', activeSquare);
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
  if (wonThreeGames(crossRoundsWon) || wonThreeGames(naughtsRoundsWon) || wonThreeGames(drawnGames)) {
    crossRoundsWon = 0;
    naughtsRoundsWon = 0;
    drawnGames = 0;
    newGameBtn.disabled= false;
    return
  }
  // currentPlayersName = 'cross';
  createBoard();
}
newGameBtn.addEventListener('click', createBoard ); 