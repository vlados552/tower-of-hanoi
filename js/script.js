//#region /*----- classes -----*/
class Disk {
	constructor(index, img) {
		this.index = index;
		this.img = img;
	}
}
//#endregion
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
let incorrectMove;
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
		renderGlowElement(pickedDisk);
		if (incorrectMove) {
			renderIncorrectMove(pickedDisk);
		}
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
	const disk = new Disk(num);
	disk.index = num;
	if (num === 1) {
		disk.img = '/img/top.png';
	} else {
		disk.img = `/img/part${Math.floor(getRandomValue(1, 2))}.png`;
	}
	leftRodArr.push(disk);
	generateDisks(num - 1);
}
function createElementDisk(value) {
	element = document.createElement('div');
	element.classList.add('disk');
	element.style.height = '20%';
	element.style.width = diskWidth(value.index);
	element.style.backgroundSize = '100% 100%';
	element.style.backgroundRepeat = 'no-repeat';
	element.style.backgroundPosition = 'bottom';
	element.style.marginBottom = '-20px';
	element.style.backgroundImage = `url('${value.img}')`;

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
	if (destination[destination.length - 1] === undefined) {
		return true;
	}
	if (
		pickedDisk[pickedDisk.length - 1].index <
		destination[destination.length - 1].index
	) {
		return true;
	} else {
		incorrectMove = true;
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

function renderIncorrectMove(array) {
	if (array === leftRodArr) {
		addClass(leftRodEl.firstChild, 'shake');
		setTimeout(removeClass, 1000, leftRodEl.firstChild, 'shake');
	} else if (array === centerRodArr) {
		addClass(centerRodEl.firstChild, 'shake');
		setTimeout(removeClass, 1000, leftRodEl.firstChild, 'shake');
	} else if (array === rightRodArr) {
		addClass(rightRodEl.firstChild, 'shake');
		setTimeout(removeClass, 1000, leftRodEl.firstChild, 'shake');
	}
	incorrectMove = false;
}
function isPuzzleSolved() {
	if (rightRodArr.length === DIFFICULT) {
		gameState = GAME_STATE_GAMECOMPLETE;
	}
}
function getRandomValue(min, max) {
	if (min >= 1) {
		return Math.random() * (max + 1 - min) + min;
	} else {
		return Math.random() * (max - min) + min;
	}
}
function renderGlowElement(array) {
	if (array === leftRodArr) {
		leftRodEl.firstChild.style.boxShadow = '0px 0px 30px 5px white';
	} else if (array === centerRodArr) {
		centerRodEl.firstChild.style.boxShadow = '0px 0px 30px 5px white';
	} else if (array === rightRodArr) {
		rightRodEl.firstChild.style.boxShadow = '0px 0px 30px 5px white';
	} else {
		leftRodEl.firstChild.style.boxShadow = 'none';
		centerRodEl.firstChild.style.boxShadow = 'none';
		rightRodEl.firstChild.style.boxShadow = 'none';
	}
}
//#endregion
