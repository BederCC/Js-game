const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const spanlives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const presult = document.querySelector("#result");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = { 
    x: 0, 
    y: 0 
};
const giftPosition = {
    x: undefined,
    y: undefined
};
let enemyPositions = [
    
];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementsSize = (canvasSize / 10);
    
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame() {
    console.log({canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = "end";

    const map = maps[level];
    if(!map) {
        gameWin();
        console.log("No hay mas niveles");
        return;
    }

    if(!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});
    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1.2);
            const posY = elementsSize * (rowIndex + 0.8);

            if(col === 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            }else if(col === 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if(col === 'X') {
                enemyPositions.push({ x: posX, y: posY });
            }
            game.fillText(emoji, posX, posY);
        });
    });
    movePlayer();
    showLives();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = playerPosition.x.toFixed(3) == enemy.x.toFixed(3);
        const enemyCollisionY = playerPosition.y.toFixed(3) == enemy.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });
    if (enemyCollision) {
        levelfail();
    }


    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelfail() {

    if(lives > 0) {
        lives--;
        console.log("Perdiste una vida");
    }else {
        console.log("Perdiste");
        lives = 3;
        level = 0;
        timeStart = undefined;
    }
    console.log("Vidas restantes: ", lives);
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function levelWin() {
    console.log("Subiste de nivel");
    level++;
    startGame();
}

function showLives() {
    spanlives.innerHTML = emojis['HEARTH'].repeat(lives);
}

function gameWin() {
    console.log("Ganaste");
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem("record_time");
    const playerTime = (Date.now() - timeStart)/1000;

    if(recordTime) {
        if(recordTime > playerTime) {
            localStorage.setItem("record_time", playerTime);
            presult.innerHTML = "Nuevo record";
        }else{
            presult.innerHTML = "Lo siento, no superaste el record";
        }
    }else {
        localStorage.setItem("record_time", (Date.now() - timeStart)/1000);
        presult.innerHTML = "Primera vez que juegas, supera tu record";
    }
    console.log({recordTime, playerTime});
}

function showTime() {
    spanTime.innerHTML = (Date.now() - timeStart)/1000;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem("record_time");
}

    window.addEventListener("keydown", moveByKeys);
    btnUp.addEventListener("click", moveUp);
    btnDown.addEventListener("click", moveDown);
    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);

    function moveByKeys(event) {
        if (event.key === "ArrowUp") moveUp();
        if (event.key === "ArrowDown") moveDown();
        if (event.key === "ArrowLeft") moveLeft();
        if (event.key === "ArrowRight") moveRight();
    }
    function moveUp() {
        console.log("up");
        if((playerPosition.y - elementsSize) < 0) {
            console.log("You can't go up");
        }else {
            playerPosition.y -= elementsSize;
            startGame();
        }
    }
    function moveLeft() {
        console.log("left");
        if((playerPosition.x - elementsSize) < 40) {
            console.log("You can't go left");
        }else {
            playerPosition.x -= elementsSize;
            startGame();
        }
    }
    function moveRight() {
        console.log("right");
        if((playerPosition.x + elementsSize) > 440) {
            console.log("You can't go right");
        }else {
            playerPosition.x += elementsSize;
            startGame();
        }
    }
    function moveDown() {
        console.log("down");
        if((playerPosition.y + elementsSize) > canvasSize) {
            console.log("You can't go down");
        }else {
            playerPosition.y += elementsSize;
            startGame();
        }
    }
