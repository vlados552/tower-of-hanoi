//#region /*----- constants -----*/
const DIFFICULT = 5;
const GAME_STATE_WELCOME = 0;
const GAME_STATE_HOWTOPLAY = 1;
// const GAME_STATE_DIFFICULT = 2;
const GAME_STATE_GAMEPLAY = 3;
const GAME_STATE_GAMEOVER = 4;
//#endregion
//#region /*----- app's state (variables) -----*/
let gameState;
let leftRodArr;
let centerRodArr;
let rightRodArr;
//#endregion
//#region /*----- cached element references -----*/
const btnPlay = document.querySelector('#js-modal-btn-play');
const btnHowToPlay = document.querySelector('#js-modal-btn-how-to');
const btnCloseHowToPlay = document.querySelector('#js-modal-btn-how-to-close');
const btnSurrender = document.querySelector('#js-btn-surrender');
const btnPlayAgain = document.querySelector('#js-modal-game-over-play-again');
const body = document.querySelector('body');
const modalWelcome = document.querySelector('.modal-welcome');
const modalHowToPlay = document.querySelector('.modal-how-to-play');
const modalGameOver = document.querySelector('.modal-game-over');
const leftRodEl = document.querySelector('.left-rod');
const centerRodEl = document.querySelector('.center-rod');
const rightRodEl = document.querySelector('.right-rod');
// const btnPickDifficult = document.querySelector('#js-modal-game-over-pick-difficult');
//#endregion
//#region /*----- event listeners -----*/
body.addEventListener('click', function (e) {
	if (e.target === btnPlay) {
		gameState = GAME_STATE_GAMEPLAY;
		init();
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
	if (e.path.includes(leftRodEl)) {
		console.log(true);
	}
});
//#endregion
//#region /*----- functions -----*/
function init() {
	gameState = GAME_STATE_GAMEPLAY;
	clearRodsArr();
	clearRodsEl();
	generateDisks(DIFFICULT);
	render();
}
function render() {
	renderGameState();
	renderRods();
}
function renderGameState() {
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
function renderRods() {
	clearRodsEl();
	renderRod(leftRodArr, leftRodEl);
	renderRod(centerRodArr, centerRodEl);
	renderRod(rightRodArr, rightRodEl);
}
function renderRod(rodArr, rodEl) {
	rodArr.forEach(function (value) {
		// rodEl.appendChild(createElementDisk(value));
		rodEl.prepend(createElementDisk(value));
	});
}
function addClass(target, className) {
	target.classList.add(className);
}
function removeClass(target, className) {
	target.classList.remove(className);
}
function generateDisks(num) {
	if (num < 1) return;
	leftRodArr.push(num);
	generateDisks(num - 1);
}
function createElementDisk(index) {
	element = document.createElement('div');
	element.classList.add('disk');
	element.style.height = '20%';
	element.style.width = diskWidth(index);
	element.style.border = '3px solid white';
	return element;
}
function diskWidth(index) {
	let result = 0;
	if (index === DIFFICULT) {
		result = 100;
	} else {
		result = Math.floor((100 / DIFFICULT) * index);
	}
	return `${result}%`;
}
function clearRodsArr() {
	leftRodArr = [];
	centerRodArr = [];
	rightRodArr = [];
}
function clearRodsEl() {
	leftRodEl.innerHTML = '';
	leftRodEl.appendChild(createBasement());
	centerRodEl.innerHTML = '';
	centerRodEl.appendChild(createBasement());
	rightRodEl.innerHTML = '';
	rightRodEl.appendChild(createBasement());
}
function createBasement() {
	element = document.createElement('div');
	element.classList.add('basement');
	return element;
}
//#endregion
