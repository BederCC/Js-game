const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");

let canvasSize;
let elementsSize;

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

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1.2);
            const posY = elementsSize * (rowIndex + 0.8);
            game.fillText(emoji, posX, posY);
        });
    });
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
    }
    function moveDown() {
        console.log("down");
    }
    function moveLeft() {
        console.log("left");
    }
    function moveRight() {
        console.log("right");
    }
