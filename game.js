const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    game.fillStyle = 'black';
    game.fillRect(0, 0, canvas.width, canvas.height);
    game.fillStyle = 'white';
    game.font = '30px Arial';
    game.fillText('Hello World', 100, 100);

}
