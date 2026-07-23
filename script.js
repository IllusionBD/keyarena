// Stories Data
const stories = {
    lifehacks: [
        ["drink", "a", "glass", "of", "water", "first", "thing", "in", "the", "morning"],
        ["always", "make", "your", "bed", "right", "after", "you", "wake", "up"]
    ],
    productivity: [
        ["focus", "on", "only", "one", "important", "task", "at", "a", "time"]
    ],
    health: [
        ["get", "at", "least", "fifteen", "minutes", "of", "natural", "sunlight"]
    ]
};

let words = [];
let currentFullStoryArray = [];
let currentWord = 0;
let score = 0;
let timeLeft = 60;
let timer = null;
let isPaused = false;

// DOM Elements - Main Game
const wordElement = document.getElementById("word");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const timerElement = document.getElementById("timer");
const startScreen = document.getElementById("startScreen");
const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const typingInput = document.getElementById("typingInput");
const timeOptions = document.getElementsByName("gameTime");
const menuTimeOptions = document.getElementsByName("menuGameTime");
const menuCategoryOptions = document.getElementsByName("menuStoryCategory");
const pauseBtn = document.getElementById("pauseBtn");
const menuBtn = document.getElementById("menuBtn");
const menuArea = document.getElementById("menuArea");
const homeBtn = document.getElementById("homeBtn");
const resumeBtn = document.getElementById("resumeBtn");
const readStoryBtn = document.getElementById("readStoryBtn");
const storyModal = document.getElementById("storyModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const fullStoryText = document.getElementById("fullStoryText");
const toggleTimerBtn = document.getElementById("toggleTimerBtn");
const timerOptionsContainer = document.getElementById("timerOptionsContainer");
const selectedTimeDisplay = document.getElementById("selectedTimeDisplay");
const customTimeInput = document.getElementById("customTimeInput");
const toggleMenuTimerBtn = document.getElementById("toggleMenuTimerBtn");
const menuTimerOptionsContainer = document.getElementById("menuTimerOptionsContainer");
const selectedMenuTimeDisplay = document.getElementById("selectedMenuTimeDisplay");
const menuCustomTimeInput = document.getElementById("menuCustomTimeInput");
const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAboutModalBtn = document.getElementById("closeAboutModalBtn");

// Event Handlers for UI Toggle
if (toggleTimerBtn) {
    toggleTimerBtn.onclick = () => {
        timerOptionsContainer.style.display = timerOptionsContainer.style.display === "none" ? "block" : "none";
    };
}

if (toggleMenuTimerBtn) {
    toggleMenuTimerBtn.onclick = () => {
        menuTimerOptionsContainer.style.display = menuTimerOptionsContainer.style.display === "none" ? "block" : "none";
    };
}

if (aboutBtn) {
    aboutBtn.onclick = () => {
        menuArea.style.display = "none";
        aboutModal.style.display = "flex";
    };
}

if (closeAboutModalBtn) {
    closeAboutModalBtn.onclick = () => {
        aboutModal.style.display = "none";
        menuArea.style.display = "block";
    };
}

function syncTimeSelection(timeVal) {
    timeOptions.forEach(opt => opt.checked = (Number(opt.value) === Number(timeVal)));
    menuTimeOptions.forEach(opt => opt.checked = (Number(opt.value) === Number(timeVal)));
    if (selectedTimeDisplay) selectedTimeDisplay.textContent = timeVal + "s";
    if (selectedMenuTimeDisplay) selectedMenuTimeDisplay.textContent = timeVal + "s";
}

function getSelectedTime() {
    if (customTimeInput && Number(customTimeInput.value) > 0) return Number(customTimeInput.value);
    let selectedTime = 60;
    timeOptions.forEach(option => {
        if (option.checked) selectedTime = Number(option.value);
    });
    return selectedTime;
}

function getSelectedCategory() {
    let selectedCategory = "lifehacks";
    menuCategoryOptions.forEach(option => {
        if (option.checked) selectedCategory = option.value;
    });
    return selectedCategory;
}

function resetGame() {
    clearInterval(timer);
    isPaused = false;
    const selectedCategory = getSelectedCategory();
    timeLeft = getSelectedTime();
    
    const categoryStories = stories[selectedCategory] || stories.lifehacks;
    const randomStory = categoryStories[Math.floor(Math.random() * categoryStories.length)];
    currentFullStoryArray = randomStory;
    words = randomStory;
    
    currentWord = 0;
    score = 0;
    if (scoreElement) scoreElement.textContent = "Score: 0";
    if (timerElement) timerElement.textContent = "Time: " + timeLeft;
    if (wordElement) wordElement.textContent = words[currentWord] || "";
    if (messageElement) messageElement.textContent = "";
    if (typingInput) {
        typingInput.disabled = false;
        typingInput.value = "";
    }
    if (readStoryBtn) readStoryBtn.style.display = "none";
    if (pauseBtn) pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        if (timerElement) timerElement.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (wordElement) wordElement.textContent = "Time Over! ⏰";
            if (messageElement) messageElement.textContent = "Final Score: " + score;
            if (typingInput) typingInput.disabled = true;
            if (readStoryBtn) readStoryBtn.style.display = "inline-block";
        }
    }, 1000);
}

if (typingInput) {
    typingInput.addEventListener("input", () => {
        if (typingInput.value.trim() === words[currentWord]) {
            messageElement.textContent = "Correct! 🎉";
            score++;
            scoreElement.textContent = "Score: " + score;
            currentWord++;

            if (currentWord < words.length) {
                wordElement.textContent = words[currentWord];
            } else {
                clearInterval(timer);
                wordElement.textContent = "Story Complete! 📖";
                messageElement.textContent = "Final Score: " + score;
                typingInput.disabled = true;
                readStoryBtn.style.display = "inline-block";
            }
            typingInput.value = "";
        }
    });
}

if (startBtn) {
    startBtn.onclick = () => {
        resetGame();
        startScreen.style.display = "none";
        gameArea.style.display = "block";
        typingInput.focus();
        startTimer();
    };
}

if (restartBtn) {
    restartBtn.onclick = () => {
        resetGame();
        typingInput.focus();
        startTimer();
    };
}

if (pauseBtn) {
    pauseBtn.onclick = () => {
        if (!isPaused && timeLeft > 0) {
            clearInterval(timer);
            isPaused = true;
            typingInput.disabled = true;
            pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            messageElement.textContent = "Paused ⏸";
        } else if (isPaused && timeLeft > 0) {
            startTimer();
            isPaused = false;
            typingInput.disabled = false;
            typingInput.focus();
            pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            messageElement.textContent = "";
        }
    };
}

if (menuBtn) {
    menuBtn.onclick = () => {
        menuArea.style.display = "block";
        clearInterval(timer);
        isPaused = true;
        if (typingInput) typingInput.disabled = true;
    };
}

if (resumeBtn) {
    resumeBtn.onclick = () => {
        menuArea.style.display = "none";
        if (isPaused && timeLeft > 0) {
            startTimer();
            isPaused = false;
            typingInput.disabled = false;
            typingInput.focus();
        }
    };
}

if (homeBtn) {
    homeBtn.onclick = () => {
        clearInterval(timer);
        gameArea.style.display = "none";
        startScreen.style.display = "block";
        menuArea.style.display = "none";
    };
}

if (readStoryBtn) {
    readStoryBtn.onclick = () => {
        fullStoryText.textContent = currentFullStoryArray.join(" ");
        storyModal.style.display = "flex";
    };
}

if (closeModalBtn) {
    closeModalBtn.onclick = () => storyModal.style.display = "none";
}

// ==========================================
// REAL GAME MODE LOGIC (SAFE & ISOLATED)
// ==========================================
const realGameModeBtn = document.getElementById("realGameModeBtn");
const realGameModal = document.getElementById("realGameModal");
const closeRealGameBtn = document.getElementById("closeRealGameBtn");
const startFightBtn = document.getElementById("startFightBtn");

const playerHpBar = document.getElementById("playerHpBar");
const enemyHpBar = document.getElementById("enemyHpBar");
const playerChar = document.getElementById("playerChar");
const enemyChar = document.getElementById("enemyChar");

const targetKeyElement = document.getElementById("targetKey");
const keyTimerProgress = document.getElementById("keyTimerProgress");
const comboDisplay = document.getElementById("comboDisplay");
const fightMessage = document.getElementById("fightMessage");

let playerHp = 100;
let enemyHp = 100;
let currentKey = "";
let isFightActive = false;
let keyTimerInterval = null;
let currentKeyTimeLeft = 100;
let keyTimeDuration = 1500;
let comboCount = 0;

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

if (realGameModeBtn) {
    realGameModeBtn.onclick = () => {
        menuArea.style.display = "none";
        realGameModal.style.display = "flex";
        resetFightState();
    };
}

if (closeRealGameBtn) {
    closeRealGameBtn.onclick = () => {
        endFight();
        realGameModal.style.display = "none";
    };
}

function resetFightState() {
    endFight();
    playerHp = 100;
    enemyHp = 100;
    comboCount = 0;
    keyTimeDuration = 1500;
    if (playerHpBar) playerHpBar.style.width = "100%";
    if (enemyHpBar) enemyHpBar.style.width = "100%";
    if (targetKeyElement) targetKeyElement.textContent = "?";
    if (comboDisplay) comboDisplay.textContent = "Combo: 0x";
    if (fightMessage) fightMessage.textContent = "Press Start to Fight!";
    if (startFightBtn) startFightBtn.style.display = "inline-block";
}

if (startFightBtn) {
    startFightBtn.onclick = () => {
        resetFightState();
        startFightBtn.style.display = "none";
        isFightActive = true;
        fightMessage.textContent = "Get Ready!";
        nextKeyPrompt();
    };
}

function nextKeyPrompt() {
    if (!isFightActive) return;

    currentKey = alphabets[Math.floor(Math.random() * alphabets.length)];
    if (targetKeyElement) targetKeyElement.textContent = currentKey;

    keyTimeDuration = Math.max(700, 1500 - (comboCount * 40)); 
    currentKeyTimeLeft = 100;
    if (keyTimerProgress) keyTimerProgress.style.width = "100%";

    clearInterval(keyTimerInterval);
    const intervalStep = 20; 
    const decrement = (intervalStep / keyTimeDuration) * 100;

    keyTimerInterval = setInterval(() => {
        if (!isFightActive) {
            clearInterval(keyTimerInterval);
            return;
        }

        currentKeyTimeLeft -= decrement;
        if (keyTimerProgress) keyTimerProgress.style.width = Math.max(0, currentKeyTimeLeft) + "%";

        if (currentKeyTimeLeft <= 0) {
            clearInterval(keyTimerInterval);
            handleEnemyAttack("Time Over! Enemy hit you! 💥");
        }
    }, intervalStep);
}

// Keydown event listener for fighting arena
window.addEventListener("keydown", (e) => {
    if (!isFightActive) return;

    const pressedKey = e.key.toUpperCase();

    if (alphabets.includes(pressedKey)) {
        clearInterval(keyTimerInterval);

        if (pressedKey === currentKey) {
            handlePlayerAttack();
        } else {
            handleEnemyAttack("Wrong Key! Enemy hit you! ⚔️");
        }
    }
});

function handlePlayerAttack() {
    comboCount++;
    if (comboDisplay) comboDisplay.textContent = "Combo: " + comboCount + "x";

    let damage = 10;
    if (comboCount % 4 === 0) {
        damage = 25;
        if (fightMessage) fightMessage.textContent = "🔥 SUPER PUNCH!! (" + damage + " Damage)";
    } else {
        if (fightMessage) fightMessage.textContent = "Nice Hit! 🎉";
    }

    if (playerChar) {
        playerChar.classList.add("attack-player");
        setTimeout(() => playerChar.classList.remove("attack-player"), 200);
    }

    if (enemyChar) {
        enemyChar.classList.add("shake-damage");
        setTimeout(() => enemyChar.classList.remove("shake-damage"), 300);
    }

    enemyHp = Math.max(0, enemyHp - damage);
    if (enemyHpBar) enemyHpBar.style.width = enemyHp + "%";

    if (enemyHp <= 0) {
        fightWin();
    } else {
        setTimeout(nextKeyPrompt, 250);
    }
}

function handleEnemyAttack(msg) {
    comboCount = 0;
    if (comboDisplay) comboDisplay.textContent = "Combo: 0x";
    if (fightMessage) fightMessage.textContent = msg;

    if (enemyChar) {
        enemyChar.classList.add("attack-enemy");
        setTimeout(() => enemyChar.classList.remove("attack-enemy"), 200);
    }

    if (playerChar) {
        playerChar.classList.add("shake-damage");
        setTimeout(() => playerChar.classList.remove("shake-damage"), 300);
    }

    playerHp = Math.max(0, playerHp - 15);
    if (playerHpBar) playerHpBar.style.width = playerHp + "%";

    if (playerHp <= 0) {
        fightLose();
    } else {
        setTimeout(nextKeyPrompt, 400);
    }
}

function fightWin() {
    endFight();
    if (targetKeyElement) targetKeyElement.textContent = "🏆";
    if (fightMessage) fightMessage.textContent = "YOU WIN! Enemy Defeated! 🎉";
    if (startFightBtn) {
        startFightBtn.textContent = "Play Again";
        startFightBtn.style.display = "inline-block";
    }
}

function fightLose() {
    endFight();
    if (targetKeyElement) targetKeyElement.textContent = "💀";
    if (fightMessage) fightMessage.textContent = "GAME OVER! You were knocked out!";
    if (startFightBtn) {
        startFightBtn.textContent = "Try Again";
        startFightBtn.style.display = "inline-block";
    }
}

function endFight() {
    isFightActive = false;
    clearInterval(keyTimerInterval);
}

// Modal Click Outside Handlers
window.onclick = (e) => {
    if (e.target === storyModal) storyModal.style.display = "none";
    if (e.target === aboutModal) {
        aboutModal.style.display = "none";
        menuArea.style.display = "block";
    }
    if (e.target === realGameModal) {
        endFight();
        realGameModal.style.display = "none";
    }
};
