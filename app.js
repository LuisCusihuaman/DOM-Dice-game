/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const PLAYER_ONE = 0;
const PLAYER_TWO = 1;
const BAD_NUMBER = 1;
var scores, roundScore, activePlayer, gamePlaying;

initGame();

function initGame() {
	gamePlaying = true;
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	document.getElementById("dice-1").style.display = "none";
	document.getElementById("dice-2").style.display = "none";
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}

function changeNextPlayer() {
	roundScore = 0;
	document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
	activePlayer = activePlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
	document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
	document.getElementById("dice-1").style.display = "none";
	document.getElementById("dice-2").style.display = "none";
}

function showWinningPlayer(){
	document.getElementById("name-" + activePlayer).textContent = "Winner! ";
	document.getElementById("dice-1").style.display = "none";
	document.getElementById("dice-2").style.display = "none";

	document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
	document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
	gamePlaying = false;
}

function getDice(){
	return Math.floor(Math.random() * 6 + 1);
}

function throwDice(dice1,dice2){
	document.getElementById("dice-1").style.display = "block";
	document.getElementById("dice-2").style.display = "block";
	document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
	document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
}

function losingTotalScore(){
	scores[activePlayer] = 0;
	document.getElementById("score-" + activePlayer).textContent = "0";
	changeNextPlayer();
}

function losingTemporaryScore(temporaryScore){
	temporaryScore.textContent = 0;
	changeNextPlayer();
}

//Throw the dice and activate the game logic
document.querySelector(".btn-roll").addEventListener("click", function() {
	if (gamePlaying) {
		var dice1 = getDice();
		var dice2 = getDice();

		var activePlayerDOM = document.getElementById("current-" + activePlayer);
		throwDice(dice1,dice2);

		if(dice1 === 6 && dice2 === 6){
			losingTotalScore();
		} else if (dice1 !== BAD_NUMBER) {
			roundScore += dice1 + dice2;
			activePlayerDOM.textContent = roundScore;
		} else {
			losingTemporaryScore(activePlayerDOM);
		}
	}
});

//Save the temporary score and change players
document.querySelector(".btn-hold").addEventListener("click", function() {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
		var input = document.querySelector(".final-score").value;
		var winningScore = input > 0 ? input: 100;
		if (scores[activePlayer] >= winningScore) {
			showWinningPlayer();
		} else {
			changeNextPlayer();
		}
	}
});

//Start a new game
document.querySelector(".btn-new").addEventListener("click", initGame);
