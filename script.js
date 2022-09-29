let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let scoreboard = document.getElementById('scoreboard');

const GAME_BOARD_WIDTH = 480, GAME_BOARD_HEIGHT = 360;
const BALL_RADIUS = 7, BALL_RADIAN = 30, BALL_SPEED = 10;

let x = canvas.width/2;
let y = canvas.height - BALL_RADIAN;
let dx = 2;
let dy = -2;
let score = 0;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 95;
let paddleX = (canvas.width-PADDLE_WIDTH)/2;

let rightPressed = false;
let leftPressed = false;

let GameBoard = function(width, height) {
    this.width = width;
    this.height = height;
    this.drawGameBoard = function(canvas) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
        x = canvas.width/2;
        y = canvas.height - BALL_RADIAN;
    }

}

let Ball = function() {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.ballRadian = BALL_RADIAN;
    this.ballSpeed = BALL_SPEED;

    this.move = function() {
        if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
            dx = -dx;
        }
        if (y + dy < BALL_RADIUS) {
            dy = -dy;
        } else if (y === canvas.height - 40 -PADDLE_HEIGHT) {
            if (x >= paddleX && x <= paddleX + PADDLE_WIDTH)
            {
                dy = -dy;
            }
        } else if (y + BALL_RADIUS > canvas.height - 40 -PADDLE_HEIGHT) {
            if (y + dy - 5 >= canvas.height - BALL_RADIUS) {
                alert("HAHAHA. Gà \nĐiểm: " + score );
                clearInterval(interval);
                document.location.reload();
            }
        }
        x += dx;
        y += dy;
    }
    this.drawBall = function() {
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS, 0, Math.PI*2);
        ctx.fillStyle = "#7c7c7c";
        ctx.fill();
        ctx.closePath();
    }
}
let Paddle = function(width, xCoordinate) {
    this.width = width;
    this.height = PADDLE_HEIGHT;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = canvas.height - 40 -PADDLE_HEIGHT;

    this.move = function() {
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = true;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = false;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = false;
            }
        }
        if (rightPressed) {
            paddleX += 7;
            if (paddleX + PADDLE_WIDTH > canvas.width) {
                paddleX = canvas.width - PADDLE_WIDTH;
            }
        }

        if (leftPressed) {
            paddleX -= 7;
            if (paddleX < 0) {
                paddleX = 0;
            }
        }
    };
    this.drawPaddle = function() {
        ctx.beginPath();
        ctx.rect(paddleX, this.yCoordinate, this.width, this.height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
}

function drawGame() {
    let ball = new Ball(x, y, BALL_RADIAN, BALL_SPEED);
    let paddle = new Paddle(PADDLE_WIDTH, 200);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    ball.move();

    paddle.drawPaddle(paddleX, PADDLE_WIDTH);
    paddle.move();
}

let gameBoard = new GameBoard(GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
gameBoard.drawGameBoard(canvas);
const interval = setInterval(drawGame, BALL_SPEED);

setInterval(function() {
    score++;
    scoreboard.innerHTML = "Score: " + score;
}, 1000);
