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

const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");
const typingInput = document.getElementById("typingInput");

startBtn.addEventListener("click", function () {
    gameArea.style.display = "block";
    startBtn.style.display = "none";
    typingInput.focus();
});
