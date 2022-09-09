//#region /*----- constants -----*/
const DIFFICULT = 5;
const GAME_STATE_WELCOME = 0;
const GAME_STATE_HOWTOPLAY = 1;
// const GAME_STATE_DIFFICULT = 2;
const GAME_STATE_GAMEPLAY = 3;
const GAME_STATE_GAMEOVER = 4;
const GAME_STATE_GAMECOMPLETE = 5;
//#endregion
//#region /*----- app's state (variables) -----*/
let gameState;
let leftRodArr;
let centerRodArr;
let rightRodArr;
let pickedDisk;
//#endregion
//#region /*----- cached element references -----*/
const btnPlay = document.querySelector('#js-modal-btn-play');
const btnHowToPlay = document.querySelector('#js-modal-btn-how-to');
const btnCloseHowToPlay = document.querySelector('#js-modal-btn-how-to-close');
const btnSurrender = document.querySelector('#js-btn-surrender');
const btnPlayAgain = document.querySelector('#js-modal-game-over-play-again');
const btnCompletePlayAgain = document.querySelector(
	'#js-modal-game-complete-play-again'
);
const body = document.querySelector('body');
const modalWelcome = document.querySelector('.modal-welcome');
const modalHowToPlay = document.querySelector('.modal-how-to-play');
const modalGameOver = document.querySelector('.modal-game-over');
const modalGameComplete = document.querySelector('.modal-game-complete');
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
	}
	if (e.target === btnCloseHowToPlay) {
		gameState = GAME_STATE_WELCOME;
	}
	if (e.target === btnSurrender) {
		gameState = GAME_STATE_GAMEOVER;
	}
	if (e.target === btnPlayAgain || e.target === btnCompletePlayAgain) {
		gameState = GAME_STATE_GAMEPLAY;
		init();
	}
	if (e.path.includes(leftRodEl)) {
		makeAction(leftRodArr);
	}
	if (e.path.includes(centerRodEl)) {
		makeAction(centerRodArr);
	}
	if (e.path.includes(rightRodEl)) {
		makeAction(rightRodArr);
	}
	render();
});
// document.addEventListener('keypress', function (e) {
// 	const keyName = e.key;
// 	if (gameState === GAME_STATE_GAMEPLAY) {
// 		if (keyName === '1') {
// 			makeAction(leftRodArr);
// 		}
// 		if (keyName === '2') {
// 			makeAction(leftRodArr);
// 		}
// 		if (keyName === '3') {
// 			makeAction(leftRodArr);
// 		}
// 		render();
// 	}
// });
//#endregion
//#region /*----- functions -----*/
function init() {
	gameState = GAME_STATE_GAMEPLAY;
	pickedDisk = null;
	clearRodsArr();
	clearRodsEl();
	generateDisks(DIFFICULT);
}
function render() {
	renderGameState();
	if (gameState === GAME_STATE_GAMEPLAY) {
		renderRods();
	}
}
function renderGameState() {
	if (gameState === GAME_STATE_WELCOME) {
		removeClass(modalWelcome, 'hide');
		addClass(modalHowToPlay, 'hide');
		addClass(modalGameOver, 'hide');
		addClass(modalGameComplete, 'hide');
	} else if (gameState === GAME_STATE_HOWTOPLAY) {
		addClass(modalWelcome, 'hide');
		removeClass(modalHowToPlay, 'hide');
		addClass(modalGameOver, 'hide');
		addClass(modalGameComplete, 'hide');
	} else if (gameState === GAME_STATE_GAMEPLAY) {
		addClass(modalWelcome, 'hide');
		addClass(modalHowToPlay, 'hide');
		addClass(modalGameOver, 'hide');
		addClass(modalGameComplete, 'hide');
	} else if (gameState === GAME_STATE_GAMEOVER) {
		addClass(modalWelcome, 'hide');
		addClass(modalHowToPlay, 'hide');
		removeClass(modalGameOver, 'hide');
		addClass(modalGameComplete, 'hide');
	} else if (gameState === GAME_STATE_GAMECOMPLETE) {
		addClass(modalWelcome, 'hide');
		addClass(modalHowToPlay, 'hide');
		addClass(modalGameOver, 'hide');
		removeClass(modalGameComplete, 'hide');
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
function pickDisk(source) {
	pickedDisk = source;
}
function moveDisk(source, destination) {
	destination.push(source[source.length - 1]);
	source.pop();
	pickedDisk = null;
}
function checkEligibility(destination) {
	if (
		pickedDisk[pickedDisk.length - 1] < destination[destination.length - 1] ||
		destination[destination.length - 1] === undefined
	) {
		return true;
	} else {
		incorrectMove();
		return false;
	}
}
function makeAction(array) {
	if (pickedDisk === array) {
		pickedDisk = null;
	} else if (pickedDisk !== null) {
		if (checkEligibility(array)) {
			moveDisk(pickedDisk, array);
			isPuzzleSolved();
		}
	} else {
		pickDisk(array);
	}
}
function incorrectMove() {
	console.log('incorrect move');
}
function isPuzzleSolved() {
	if (rightRodArr.length === DIFFICULT) {
		gameState = GAME_STATE_GAMECOMPLETE;
	}
}
//#endregion
