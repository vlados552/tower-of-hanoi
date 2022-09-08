/*----- constants -----*/
const DIFFICULT = 5;
const GAME_STATE_WELCOME = 0;
const GAME_STATE_HOWTOPLAY = 1;
// const GAME_STATE_DIFFICULT = 2;
const GAME_STATE_GAMEPLAY = 3;
const GAME_STATE_GAMEOVER = 4;
/*----- app's state (variables) -----*/
let gameState;
/*----- cached element references -----*/
const btnPlay = document.querySelector('#js-modal-btn-play');
const btnHowToPlay = document.querySelector('#js-modal-btn-how-to');
const btnCloseHowToPlay = document.querySelector('#js-modal-btn-how-to-close');
const btnSurrender = document.querySelector('#js-btn-surrender');
const btnPlayAgain = document.querySelector('#js-modal-game-over-play-again');
const body = document.querySelector('body');
const modalWelcome = document.querySelector('.modal-welcome');
const modalHowToPlay = document.querySelector('.modal-how-to-play');
const modalGameOver = document.querySelector('.modal-game-over');
// const btnPickDifficult = document.querySelector('#js-modal-game-over-pick-difficult');
/*----- event listeners -----*/
body.addEventListener('click', function (e) {
	if (e.target === btnPlay) {
		gameState = GAME_STATE_GAMEPLAY;
		render();
	}
	if (e.target === btnHowToPlay) {
		gameState = GAME_STATE_HOWTOPLAY;
		render();
	}
	if (e.target === btnCloseHowToPlay) {
		gameState = GAME_STATE_WELCOME;
		render();
	}
	if (e.target === btnSurrender) {
		gameState = GAME_STATE_GAMEOVER;
		render();
	}
	if (e.target === btnPlayAgain) {
		gameState = GAME_STATE_GAMEPLAY;
		render();
	}
});
/*----- functions -----*/
function init() {
	render();
}
function render() {
	if (gameState === GAME_STATE_WELCOME) {
		removeClass(modalWelcome, 'hide');
		addClass(modalHowToPlay, 'hide');
		addClass(modalGameOver, 'hide');
	} else if (gameState === GAME_STATE_HOWTOPLAY) {
		addClass(modalWelcome, 'hide');
		removeClass(modalHowToPlay, 'hide');
		addClass(modalGameOver, 'hide');
	} else if (gameState === GAME_STATE_GAMEPLAY) {
		addClass(modalWelcome, 'hide');
		addClass(modalHowToPlay, 'hide');
		addClass(modalGameOver, 'hide');
	} else if (gameState === GAME_STATE_GAMEOVER) {
		addClass(modalWelcome, 'hide');
		addClass(modalHowToPlay, 'hide');
		removeClass(modalGameOver, 'hide');
	}
}

function addClass(target, className) {
	target.classList.add(className);
}
function removeClass(target, className) {
	target.classList.remove(className);
}
