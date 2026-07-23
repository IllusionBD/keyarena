// Daily Life Improvement Data
const lifeTipsData = [
    {
        category: "Habits",
        tip: "Small daily improvements over time lead to stunning long-term results.",
        story: "In 2003, British Cycling hired Dave Brailsford. He believed in the 1% margin of gains—improving everything by just 1%. Five years later, the team dominated the Olympics."
    },
    {
        category: "Mindset",
        tip: "Focus on what you can control and release what you cannot.",
        story: "Stoic philosopher Epictetus was born a slave. He realized he could not control his body or master, but he had total control over his thoughts and responses."
    },
    {
        category: "Health",
        tip: "Prioritize sleep as it is the foundation of mental sharpness and vitality.",
        story: "Scientists discovered that sleep acts as a brain-washing mechanism, removing toxins accumulated during waking hours to prevent cognitive decline."
    },
    {
        category: "Productivity",
        tip: "Complete your hardest task first thing in the morning.",
        story: "Mark Twain famously said that if you eat a live frog first thing in the morning, nothing worse will happen to you the rest of the day. Do the hard work first!"
    },
    {
        category: "Time",
        tip: "Time is a non-renewable resource, guard it carefully.",
        story: "Seneca wrote that people are frugal with money, but reckless with time—the only thing where it is right to be greedy."
    }
];

// App State Variables
let currentMode = "normal"; // "normal" or "real"
let currentDiff = "easy";
let currentTipIndex = 0;
let startTime = null;
let timerInterval = null;

// Real Game Arena State Variables
let playerHp = 100;
let enemyHp = 100;
let currentTargetKey = "";
let isFightActive = false;
let fightTimerSec = 0;
let fightInterval = null;
let keyTimeout = null;
let reactionTimeLimit = 2000; // default Easy mode reaction time in ms

// DOM Elements
const hamburgerBtn = document.getElementById("hamburgerBtn");
const settingsModal = document.getElementById("settingsModal");
const resumeGameBtn = document.getElementById("resumeGameBtn");
const aboutGameBtn = document.getElementById("aboutGameBtn");
const homeGameBtn = document.getElementById("homeGameBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAboutModalBtn = document.getElementById("closeAboutModalBtn");

const normalModeBtn = document.getElementById("normalModeBtn");
const realGameBtn = document.getElementById("realGameBtn");
const diffBtns = document.querySelectorAll(".diff-btn");

const normalGameArea = document.getElementById("normalGameArea");
const realGameArea = document.getElementById("realGameArea");

// Normal Game DOM
const currentCategoryDisplay = document.getElementById("currentCategory");
const storyProgressDisplay = document.getElementById("storyProgress");
const wpmDisplay = document.getElementById("wpmDisplay");
const sentenceDisplay = document.getElementById("sentenceDisplay");
const typingInput = document.getElementById("typingInput");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const readStoryBtn = document.getElementById("readStoryBtn");
const storyModal = document.getElementById("storyModal");
const fullStoryText = document.getElementById("fullStoryText");
const closeModalBtn = document.getElementById("closeModalBtn");

// Real Game DOM
const playerHpBar = document.getElementById("playerHp");
const enemyHpBar = document.getElementById("enemyHp");
const playerHpText = document.getElementById("playerHpText");
const enemyHpText = document.getElementById("enemyHpText");
const fightTimer = document.getElementById("fightTimer");
const targetKeyDisplay = document.getElementById("targetKeyDisplay");
const fightPromptMsg = document.getElementById("fightPromptMsg");
const startFightBtn = document.getElementById("startFightBtn");
const exitFightBtn = document.getElementById("exitFightBtn");
const playerAvatar = document.getElementById("playerAvatar");
const enemyAvatar = document.getElementById("enemyAvatar");

// Modal Controls
hamburgerBtn.addEventListener("click", () => settingsModal.style.display = "flex");
resumeGameBtn.addEventListener("click", () => settingsModal.style.display = "none");
aboutGameBtn.addEventListener("click", () => {
    settingsModal.style.display = "none";
    aboutModal.style.display = "flex";
});
closeAboutModalBtn.addEventListener("click", () => aboutModal.style.display = "none");
homeGameBtn.addEventListener("click", () => {
    settingsModal.style.display = "none";
    switchMode("normal");
});

// Mode Switching
normalModeBtn.addEventListener("click", () => switchMode("normal"));
realGameBtn.addEventListener("click", () => switchMode("real"));

function switchMode(mode) {
    currentMode = mode;
    if (mode === "normal") {
        normalModeBtn.classList.add("active");
        realGameBtn.classList.remove("active");
        normalGameArea.style.display = "flex";
        realGameArea.style.display = "none";
        resetNormalGame();
    } else {
        realGameBtn.classList.add("active");
        normalModeBtn.classList.remove("active");
        normalGameArea.style.display = "none";
        realGameArea.style.display = "flex";
        resetRealGame();
    }
    settingsModal.style.display = "none";
}

// Difficulty Setting
diffBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        diffBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        currentDiff = e.target.dataset.diff;
        
        // Adjust reaction time for Fight Mode based on difficulty
        if (currentDiff === "easy") reactionTimeLimit = 2000;
        if (currentDiff === "medium") reactionTimeLimit = 1300;
        if (currentDiff === "hard") reactionTimeLimit = 800;
    });
});

/* ==========================================================================
   NORMAL GAME LOGIC
   ========================================================================== */

function loadTip() {
    const data = lifeTipsData[currentTipIndex];
    currentCategoryDisplay.textContent = data.category;
    storyProgressDisplay.textContent = `${currentTipIndex + 1} / ${lifeTipsData.length}`;
    
    // Render text characters
    sentenceDisplay.innerHTML = "";
    data.tip.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        sentenceDisplay.appendChild(span);
    });
    
    typingInput.value = "";
    readStoryBtn.style.display = "none";
}

startBtn.addEventListener("click", () => {
    typingInput.disabled = false;
    typingInput.focus();
    startBtn.disabled = true;
    startTime = new Date();
    
    // Highlight first character
    if (sentenceDisplay.children.length > 0) {
        sentenceDisplay.children[0].classList.add("current");
    }
});

typingInput.addEventListener("input", () => {
    const characters = sentenceDisplay.querySelectorAll("span");
    const typedValues = typingInput.value.split("");
    let allCorrect = true;

    characters.forEach((charSpan, index) => {
        const typedChar = typedValues[index];
        charSpan.classList.remove("current");

        if (typedChar == null) {
            charSpan.classList.remove("correct", "incorrect");
            allCorrect = false;
        } else if (typedChar === charSpan.textContent) {
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
        } else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct");
            allCorrect = false;
        }
    });

    if (typedValues.length < characters.length) {
        characters[typedValues.length].classList.add("current");
    }

    // Check completion
    if (typedValues.length === characters.length && allCorrect) {
        typingInput.disabled = true;
        nextBtn.disabled = false;
        readStoryBtn.style.display = "inline-block";
        
        // Calculate WPM
        const timeTaken = (new Date() - startTime) / 60000; // in minutes
        const wordCount = lifeTipsData[currentTipIndex].tip.split(" ").length;
        const wpm = Math.round(wordCount / timeTaken);
        wpmDisplay.textContent = `${wpm} WPM`;
    }
});

nextBtn.addEventListener("click", () => {
    currentTipIndex = (currentTipIndex + 1) % lifeTipsData.length;
    loadTip();
    startBtn.disabled = false;
    nextBtn.disabled = true;
    typingInput.disabled = true;
});

readStoryBtn.addEventListener("click", () => {
    fullStoryText.textContent = lifeTipsData[currentTipIndex].story;
    storyModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => storyModal.style.display = "none");

function resetNormalGame() {
    currentTipIndex = 0;
    wpmDisplay.textContent = "0 WPM";
    startBtn.disabled = false;
    nextBtn.disabled = true;
    typingInput.disabled = true;
    loadTip();
}

/* ==========================================================================
   REAL GAME (ARENA FIGHT) LOGIC
   ========================================================================== */

startFightBtn.addEventListener("click", startFight);
exitFightBtn.addEventListener("click", resetRealGame);

function startFight() {
    isFightActive = true;
    playerHp = 100;
    enemyHp = 100;
    fightTimerSec = 0;
    updateHpDisplays();
    
    startFightBtn.disabled = true;
    fightPromptMsg.textContent = "Fight Started! Press keys fast!";
    
    // Start Fight Timer
    fightInterval = setInterval(() => {
        fightTimerSec++;
        let mins = Math.floor(fightTimerSec / 60).toString().padStart(2, '0');
        let secs = (fightTimerSec % 60).toString().padStart(2, '0');
        fightTimer.textContent = `${mins}:${secs}`;
    }, 1000);

    triggerNextKeyPrompt();
}

function triggerNextKeyPrompt() {
    if (!isFightActive) return;

    // Generate random key A-Z
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    currentTargetKey = keys[Math.floor(Math.random() * keys.length)];
    targetKeyDisplay.textContent = currentTargetKey;
    
    // Set timer for player response
    clearTimeout(keyTimeout);
    keyTimeout = setTimeout(() => {
        // Player missed key / timed out -> Enemy Hits Player
        playerHp -= 15;
        fightPromptMsg.textContent = "⚡ Too Slow! Enemy attacked you!";
        animateHit(playerAvatar, "hit-right");
        updateHpDisplays();
        checkFightEnd();

        if (isFightActive) {
            setTimeout(triggerNextKeyPrompt, 800);
        }
    }, reactionTimeLimit);
}

// Key listener for reaction fight
window.addEventListener("keydown", (e) => {
    if (!isFightActive || currentMode !== "real") return;

    const pressedKey = e.key.toUpperCase();
    
    // Ignore non-alphabet keys
    if (!/^[A-Z]$/.test(pressedKey)) return;

    clearTimeout(keyTimeout);

    if (pressedKey === currentTargetKey) {
        // Player Hit Enemy
        enemyHp -= 20;
        fightPromptMsg.textContent = "💥 Nice Attack! Enemy took hit!";
        animateHit(enemyAvatar, "hit-left");
        updateHpDisplays();
        checkFightEnd();

        if (isFightActive) {
            setTimeout(triggerNextKeyPrompt, 500);
        }
    } else {
        // Wrong Key Hit -> Player takes small penalty
        playerHp -= 10;
        fightPromptMsg.textContent = "❌ Wrong Key! Counter attacked!";
        animateHit(playerAvatar, "hit-right");
        updateHpDisplays();
        checkFightEnd();

        if (isFightActive) {
            setTimeout(triggerNextKeyPrompt, 600);
        }
    }
});

function updateHpDisplays() {
    playerHp = Math.max(0, playerHp);
    enemyHp = Math.max(0, enemyHp);

    playerHpBar.style.width = `${playerHp}%`;
    enemyHpBar.style.width = `${enemyHp}%`;

    playerHpText.textContent = `${playerHp} / 100 HP`;
    enemyHpText.textContent = `${enemyHp} / 100 HP`;
}

function animateHit(element, className) {
    element.classList.add(className);
    setTimeout(() => element.classList.remove(className), 200);
}

function checkFightEnd() {
    if (enemyHp <= 0) {
        endFight("🏆 VICTORY! You defeated the monster!");
    } else if (playerHp <= 0) {
        endFight("💀 GAME OVER! You were defeated!");
    }
}

function endFight(message) {
    isFightActive = false;
    clearInterval(fightInterval);
    clearTimeout(keyTimeout);
    
    targetKeyDisplay.textContent = "FINISHED";
    fightPromptMsg.textContent = message;
    startFightBtn.disabled = false;
}

function resetRealGame() {
    isFightActive = false;
    clearInterval(fightInterval);
    clearTimeout(keyTimeout);
    
    playerHp = 100;
    enemyHp = 100;
    fightTimerSec = 0;
    fightTimer.textContent = "00:00";
    targetKeyDisplay.textContent = "-";
    fightPromptMsg.textContent = "Click 'Start Fight' to Begin!";
    startFightBtn.disabled = false;
    
    updateHpDisplays();
}

// Initial Load
loadTip();
