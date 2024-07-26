const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");

let canvasSize;
let elementsSize;

const playerPosition = { 
    x: 0, 
    y: 0 
};

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementsSize = (canvasSize / 10);
    
    startGame();
}

function startGame() {
    console.log({canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = "end";

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

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
            }

            game.fillText(emoji, posX, posY);
        });
    });
    movePlayer();
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
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
        playerPosition.y -= elementsSize;
        startGame();
    }
    function moveRight() {
        console.log("right");
        playerPosition.x += elementsSize;
        startGame();
    }
    function moveLeft() {
        console.log("left");
        playerPosition.x -= elementsSize;
        startGame();
    }
    function moveDown() {
        console.log("down");
        playerPosition.y += elementsSize;
        startGame();
    }
