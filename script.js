// ==========================================
// EXISTING GAME CODE VARIABLES & LOGIC
// ==========================================
const stories = {
    lifehacks: [
        ["drink", "a", "glass", "of", "water", "first", "thing", "in", "the", "morning", "it", "wakes", "up", "your", "organs", "boosts", "your", "metabolism", "and", "keeps", "you", "hydrated", "after", "hours", "of", "sleep", "this", "simple", "habit", "improves", "your", "overall", "energy", "levels", "throughout", "the", "entire", "day"],
        ["always", "make", "your", "bed", "right", "after", "you", "wake", "up", "it", "gives", "you", "a", "small", "sense", "of", "accomplishment", "at", "the", "very", "start", "of", "your", "day", "a", "clean", "room", "also", "helps", "reduce", "mental", "stress", "and", "improves", "focus"]
    ],
    productivity: [
        ["focus", "on", "only", "one", "important", "task", "at", "a", "time", "multitasking", "reduces", "your", "efficiency", "and", "brain", "power", "give", "your", "full", "attention", "to", "a", "single", "goal", "and", "you", "will", "finish", "it", "much", "faster", "with", "fewer", "mistakes"]
    ],
    health: [
        ["get", "at", "least", "fifteen", "minutes", "of", "natural", "sunlight", "every", "morning", "sunlight", "helps", "regulate", "your", "sleep", "cycle", "boosts", "vitamin", "d", "levels", "and", "improves", "your", "overall", "mood", "naturally"]
    ]
};

let words = [];
let currentFullStoryArray = [];
let currentWord = 0;
let score = 0;
let timeLeft = 60;
let timer;
let isPaused = false;

// DOM Elements
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

// Event Listeners for Main Game
if (toggleTimerBtn) {
    toggleTimerBtn.addEventListener("click", function () {
        timerOptionsContainer.style.display = timerOptionsContainer.style.display === "none" ? "block" : "none";
    });
}

if (toggleMenuTimerBtn) {
    toggleMenuTimerBtn.addEventListener("click", function () {
        menuTimerOptionsContainer.style.display = menuTimerOptionsContainer.style.display === "none" ? "block" : "none";
    });
}

if (aboutBtn) {
    aboutBtn.addEventListener("click", function () {
        menuArea.style.display = "none";
        aboutModal.style.display = "flex";
    });
}

if (closeAboutModalBtn) {
    closeAboutModalBtn.addEventListener("click", function () {
        aboutModal.style.display = "none";
        menuArea.style.display = "block";
    });
}

timeOptions.forEach(opt => {
    opt.addEventListener("change", function () {
        if (customTimeInput) customTimeInput.value = "";
        syncTimeSelection(opt.value);
    });
});

if (customTimeInput) {
    customTimeInput.addEventListener("input", function () {
        if (customTimeInput.value > 0) {
            timeOptions.forEach(opt => opt.checked = false);
            menuTimeOptions.forEach(opt => opt.checked = false);
            if (menuCustomTimeInput) menuCustomTimeInput.value = customTimeInput.value;
            if (selectedTimeDisplay) selectedTimeDisplay.textContent = customTimeInput.value + "s";
            if (selectedMenuTimeDisplay) selectedMenuTimeDisplay.textContent = customTimeInput.value + "s";
        }
    });
}

menuTimeOptions.forEach(function (option) {
    option.addEventListener("change", function () {
        if (customTimeInput) customTimeInput.value = "";
        if (menuCustomTimeInput) menuCustomTimeInput.value = "";
        syncTimeSelection(option.value);

        menuTimerOptionsContainer.style.display = "none";
        menuArea.style.display = "none";
        resetGame();
        typingInput.focus();
        startTimer();
    });
});

function getSelectedTime() {
    if (customTimeInput && Number(customTimeInput.value) > 0) return Number(customTimeInput.value);
    if (menuCustomTimeInput && Number(menuCustomTimeInput.value) > 0) return Number(menuCustomTimeInput.value);

    let selectedTime = 60;
    timeOptions.forEach(function (option) {
        if (option.checked) selectedTime = Number(option.value);
    });
    return selectedTime;
}

function getSelectedCategory() {
    let selectedCategory = "lifehacks";
    menuCategoryOptions.forEach(function (option) {
        if (option.checked) selectedCategory = option.value;
    });
    return selectedCategory;
}

function prepareStoryWords(category, time) {
    const categoryStories = stories[category];
    const randomStory = categoryStories[Math.floor(Math.random() * categoryStories.length)];
    currentFullStoryArray = randomStory;
    let wordCount = Math.min(time, randomStory.length);
    return randomStory.slice(0, wordCount);
}

function syncTimeSelection(timeVal) {
    timeOptions.forEach(opt => opt.checked = (Number(opt.value) === Number(timeVal)));
    menuTimeOptions.forEach(opt => opt.checked = (Number(opt.value) === Number(timeVal)));
    if (selectedTimeDisplay) selectedTimeDisplay.textContent = timeVal + "s";
    if (selectedMenuTimeDisplay) selectedMenuTimeDisplay.textContent = timeVal + "s";
}

function resetGame() {
    clearInterval(timer);
    isPaused = false;
    const selectedCategory = getSelectedCategory();
    timeLeft = getSelectedTime();
    words = prepareStoryWords(selectedCategory, timeLeft);
    currentWord = 0;
    score = 0;
    scoreElement.textContent = "Score: 0";
    timerElement.textContent = "Time: " + timeLeft;
    wordElement.textContent = words[currentWord] || "";
    messageElement.textContent = "";
    typingInput.disabled = false;
    typingInput.value = "";
    readStoryBtn.style.display = "none";
    pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
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
            readStoryBtn.style.display = "inline-block";
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
            wordElement.textContent = "Story Complete! 📖";
            messageElement.textContent = "Final Score: " + score;
            typingInput.disabled = true;
            readStoryBtn.style.display = "inline-block";
        }
        typingInput.value = "";
    } else {
        messageElement.textContent = "Keep trying! ❌";
    }
});

startBtn.addEventListener("click", function () {
    const selectedTime = getSelectedTime();
    syncTimeSelection(selectedTime);
    resetGame();
    startScreen.style.display = "none";
    gameArea.style.display = "block";
    typingInput.focus();
    startTimer();
});

restartBtn.addEventListener("click", function () {
    resetGame();
    typingInput.focus();
    startTimer();
});

pauseBtn.addEventListener("click", function () {
    if (!isPaused && timeLeft > 0) {
        clearInterval(timer);
        isPaused = true;
        typingInput.disabled = true;
        pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        messageElement.textContent = "Game Paused ⏸";
    } else if (isPaused && timeLeft > 0) {
        startTimer();
        isPaused = false;
        typingInput.disabled = false;
        typingInput.focus();
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        messageElement.textContent = "";
    }
});

menuBtn.addEventListener("click", function () {
    if (menuArea.style.display === "block") {
        menuArea.style.display = "none";
        if (isPaused && timeLeft > 0) {
            startTimer();
            isPaused = false;
            typingInput.disabled = false;
            typingInput.focus();
            pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    } else {
        menuArea.style.display = "block";
        clearInterval(timer);
        isPaused = true;
        typingInput.disabled = true;
        pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

resumeBtn.addEventListener("click", function () {
    menuArea.style.display = "none";
    if (isPaused && timeLeft > 0) {
        startTimer();
        isPaused = false;
        typingInput.disabled = false;
        typingInput.focus();
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        messageElement.textContent = "";
    }
});

homeBtn.addEventListener("click", function () {
    clearInterval(timer);
    isPaused = false;
    gameArea.style.display = "none";
    startScreen.style.display = "block";
    menuArea.style.display = "none";
});

readStoryBtn.addEventListener("click", function () {
    fullStoryText.textContent = currentFullStoryArray.join(" ");
    storyModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function () {
    storyModal.style.display = "none";
});


// ==========================================
// ⚔️ REAL GAME MODE LOGIC
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
let currentKeyTimeLeft = 100; // Percentage
let keyTimeDuration = 1500; // ms per key (Speed scales down)
let comboCount = 0;

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Open Arena Popup
realGameModeBtn.addEventListener("click", function () {
    menuArea.style.display = "none";
    realGameModal.style.display = "flex";
    resetFightState();
});

// Close Arena Popup
closeRealGameBtn.addEventListener("click", function () {
    endFight();
    realGameModal.style.display = "none";
});

function resetFightState() {
    endFight();
    playerHp = 100;
    enemyHp = 100;
    comboCount = 0;
    keyTimeDuration = 1500;
    playerHpBar.style.width = "100%";
    enemyHpBar.style.width = "100%";
    targetKeyElement.textContent = "?";
    comboDisplay.textContent = "Combo: 0x";
    fightMessage.textContent = "Press Start to Fight!";
    startFightBtn.style.display = "inline-block";
}

startFightBtn.addEventListener("click", function () {
    resetFightState();
    startFightBtn.style.display = "none";
    isFightActive = true;
    fightMessage.textContent = "Get Ready!";
    nextKeyPrompt();
});

function nextKeyPrompt() {
    if (!isFightActive) return;

    // Pick Random Alphabet
    currentKey = alphabets[Math.floor(Math.random() * alphabets.length)];
    targetKeyElement.textContent = currentKey;

    // Difficulty Scaling (Fast speed as combo increases)
    keyTimeDuration = Math.max(700, 1500 - (comboCount * 50)); 

    // Reset Progress Bar
    currentKeyTimeLeft = 100;
    keyTimerProgress.style.width = "100%";

    clearInterval(keyTimerInterval);
    const intervalStep = 20; 
    const decrement = (intervalStep / keyTimeDuration) * 100;

    keyTimerInterval = setInterval(() => {
        if (!isFightActive) {
            clearInterval(keyTimerInterval);
            return;
        }

        currentKeyTimeLeft -= decrement;
        keyTimerProgress.style.width = Math.max(0, currentKeyTimeLeft) + "%";

        // Time's up! Player missed -> Enemy Attacks
        if (currentKeyTimeLeft <= 0) {
            clearInterval(keyTimerInterval);
            handleEnemyAttack("Time Over! Enemy hit you! 💥");
        }
    }, intervalStep);
}

// Global Keyboard Listener for Arena
window.addEventListener("keydown", function (e) {
    if (!isFightActive) return;

    const pressedKey = e.key.toUpperCase();

    // Check if key is a letter A-Z
    if (alphabets.includes(pressedKey)) {
        clearInterval(keyTimerInterval);

        if (pressedKey === currentKey) {
            handlePlayerAttack();
        } else {
            handleEnemyAttack("Wrong Key! Enemy counter-attacked! ⚔️");
        }
    }
});

function handlePlayerAttack() {
    comboCount++;
    comboDisplay.textContent = "Combo: " + comboCount + "x";

    let damage = 10;
    let isSuper = false;

    // Combo Bonus
    if (comboCount % 4 === 0) {
        damage = 25; // Super damage
        isSuper = true;
        fightMessage.textContent = "🔥 SUPER PUNCH!! " + damage + " Damage!";
    } else {
        fightMessage.textContent = "Nice Hit! 🎉";
    }

    // Animation
    playerChar.classList.add("attack-player");
    setTimeout(() => playerChar.classList.remove("attack-player"), 200);

    enemyChar.classList.add("shake-damage");
    setTimeout(() => enemyChar.classList.remove("shake-damage"), 300);

    enemyHp = Math.max(0, enemyHp - damage);
    enemyHpBar.style.width = enemyHp + "%";

    if (enemyHp <= 0) {
        fightWin();
    } else {
        setTimeout(nextKeyPrompt, 200);
    }
}

function handleEnemyAttack(msg) {
    comboCount = 0;
    comboDisplay.textContent = "Combo: 0x";
    fightMessage.textContent = msg;

    // Animation
    enemyChar.classList.add("attack-enemy");
    setTimeout(() => enemyChar.classList.remove("attack-enemy"), 200);

    playerChar.classList.add("shake-damage");
    setTimeout(() => playerChar.classList.remove("shake-damage"), 300);

    playerHp = Math.max(0, playerHp - 15);
    playerHpBar.style.width = playerHp + "%";

    if (playerHp <= 0) {
        fightLose();
    } else {
        setTimeout(nextKeyPrompt, 400);
    }
}

function fightWin() {
    endFight();
    targetKeyElement.textContent = "🏆";
    fightMessage.textContent = "YOU WIN! Enemy Defeated! 🎉";
    startFightBtn.textContent = "Play Again";
    startFightBtn.style.display = "inline-block";
}

function fightLose() {
    endFight();
    targetKeyElement.textContent = "💀";
    fightMessage.textContent = "GAME OVER! You were knocked out!";
    startFightBtn.textContent = "Try Again";
    startFightBtn.style.display = "inline-block";
}

function endFight() {
    isFightActive = false;
    clearInterval(keyTimerInterval);
}

// Modal Click Outside Handlers
window.addEventListener("click", function (e) {
    if (e.target === storyModal) storyModal.style.display = "none";
    if (e.target === aboutModal) {
        aboutModal.style.display = "none";
        menuArea.style.display = "block";
    }
    if (e.target === realGameModal) {
        endFight();
        realGameModal.style.display = "none";
    }
});
