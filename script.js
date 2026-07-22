const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");

startBtn.addEventListener("click", function () {
    gameArea.style.display = "block";
    startBtn.style.display = "none";
});
