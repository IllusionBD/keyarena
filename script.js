const words = [
    "apple",
    "banana",
    "orange",
    "keyboard",
    "computer",
    "mouse",
    "monitor",
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
const gameArea = document.getElementById("gameArea");
const typingInput = document.getElementById("typingInput");


wordElement.textContent = words[currentWord];


function startTimer() {

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


    gameArea.style.display = "block";

    startBtn.style.display = "none";

    typingInput.focus();

    startTimer();


});
