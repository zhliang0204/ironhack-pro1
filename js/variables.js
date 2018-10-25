var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var height = ctx.canvas.height;
var width = ctx.canvas.width;
var startBtn = document.getElementById("startBtn");
var gridSize = 20;
var colSize = width / gridSize - 1;
var rowSize = height / gridSize - 1;
var apple;
var snake;
var gameInterval;
var score = 0;
var level = 1;
var timeSpan = 10 *(1 + level);
var obstacles = [];
var obstacleNum = 6;

// two state: player and auto
// player: 0, default;
// auto: 1,default;
var gameState = 0;

var autoBtn = document.getElementById("autoBtn");
var pauseBtn = document.getElementById("pauseBtn");
var clearBtn = document.getElementById("clearScore");
// var bg;
var bg = new Image();
bg.src = "/images/bg.jpg";

// store players score
var storage = window.localStorage;
// store game play times
// var count = 0;

var newhead1 = new Image();
newhead1.src = "https://zhliang0204.github.io/ironhack-pro1/images/head-bottom.png"
var newhead2 = new Image();
newhead2.src = "https://zhliang0204.github.io/ironhack-pro1/images/head-left.png"
var newhead3 = new Image();
newhead3.src = "https://zhliang0204.github.io/ironhack-pro1/images/head-right.png"
var newhead4 = new Image();
newhead4.src = "https://zhliang0204.github.io/ironhack-pro1/images/head-up.png"
var trunk = new Image();
trunk.src = "https://zhliang0204.github.io/ironhack-pro1/images/obstacle.png"
var gameOverImg = new Image();
gameOverImg.src = "https://zhliang0204.github.io/ironhack-pro1/images/gameover.png"

var gameWinImg = new Image();
gameWinImg.src = "https://zhliang0204.github.io/ironhack-pro1/images/awesome.png"

// sound for the game
var eatSound = new Audio("https://zhliang0204.github.io/ironhack-pro1/sound/eatw.mp3");
var collisionSound = new Audio("https://zhliang0204.github.io/ironhack-pro1/sound/collide.mp3")