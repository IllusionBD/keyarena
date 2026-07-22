const words = [
    "apple",
     "joynal",
    "banana",
    "orange",
    "keyboard",
    "computer",
    "mouse",
    "monitor",
    "typing",
     "typing",
    "battle",
    "winner"
];


let currentWord = 0;
let score = 0;
let timeLeft = 30;
let timer;


const wordElement = document.getElementById("word");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const timerElement = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameArea = document.getElementById("gameArea");
const typingInput = document.getElementById("typingInput");


wordElement.textContent = words[currentWord];



function resetGame() {

    clearInterval(timer);

    currentWord = 0;
    score = 0;
    timeLeft = 30;

    scoreElement.textContent = "Score: 0";

    timerElement.textContent = "Time: 30";

    wordElement.textContent = words[currentWord];

    messageElement.textContent = "";

    typingInput.disabled = false;

    typingInput.value = "";

}



function startTimer() {

    clearInterval(timer);

    timer = setInterval(function () {

        timeLeft--;

        timerElement.textContent = "Time: " + timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timer);

            wordElement.textContent = "Time Over! ⏰";

            messageElement.textContent = "Final Score: " + score;

            typingInput.disabled = true;

        }


    }, 1000);

}



typingInput.addEventListener("input", function () {


    if (typingInput.value === words[currentWord]) {


        messageElement.textContent = "Correct! 🎉";


        score++;

        scoreElement.textContent = "Score: " + score;


        currentWord++;


        if (currentWord < words.length) {


            wordElement.textContent = words[currentWord];


        } else {


            clearInterval(timer);

            wordElement.textContent = "Game Over! 🎮";

            messageElement.textContent = "Final Score: " + score;

            typingInput.disabled = true;


        }


        typingInput.value = "";


    } else {


        messageElement.textContent = "Keep trying! ❌";


    }


});



startBtn.addEventListener("click", function () {


    resetGame();


    gameArea.style.display = "block";

    startBtn.style.display = "none";

    restartBtn.style.display = "inline-block";


    typingInput.focus();


    startTimer();


});



restartBtn.addEventListener("click", function () {


    resetGame();


    gameArea.style.display = "block";

    startBtn.style.display = "none";

    restartBtn.style.display = "inline-block";


    typingInput.focus();


    startTimer();


});
