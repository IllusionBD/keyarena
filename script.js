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

const wordElement = document.getElementById("word");
const scoreElement = document.getElementById("score");
wordElement.textContent = words[currentWord];

const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");
const typingInput = document.getElementById("typingInput");


typingInput.addEventListener("input", function () {

    if (typingInput.value === words[currentWord]) {
    score++;
        scoreElement.textContent = "Score: " + score;
        currentWord++;

        if (currentWord < words.length) {
            wordElement.textContent = words[currentWord];
        }

        typingInput.value = "";
    }

});


startBtn.addEventListener("click", function () {

    gameArea.style.display = "block";
    startBtn.style.display = "none";
    typingInput.focus();

});
