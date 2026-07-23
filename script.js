// Daily Life Improvement Data
const stories = {
    lifehacks: [
        ["drink", "a", "glass", "of", "water", "first", "thing", "in", "the", "morning", "it", "wakes", "up", "your", "organs", "boosts", "your", "metabolism", "and", "keeps", "you", "hydrated", "after", "hours", "of", "sleep", "this", "simple", "habit", "improves", "your", "overall", "energy", "levels", "throughout", "the", "entire", "day"],
        ["always", "make", "your", "bed", "right", "after", "you", "wake", "up", "it", "gives", "you", "a", "small", "sense", "of", "accomplishment", "at", "the", "very", "start", "of", "your", "day", "a", "clean", "room", "also", "helps", "reduce", "mental", "stress", "and", "improves", "focus"],
        ["if", "a", "task", "takes", "less", "than", "two", "minutes", "to", "do", "finish", "it", "immediately", "do", "not", "delay", "it", "putting", "away", "dishes", "or", "replying", "to", "an", "email", "right", "away", "prevents", "small", "chores", "from", "piling", "up", "later"],
        ["take", "a", "short", "five", "minute", "walk", "every", "hour", "sitting", "for", "too", "long", "harms", "your", "posture", "and", "slows", "down", "blood", "circulation", "moving", "around", "refreshes", "your", "brain", "and", "keeps", "your", "body", "active", "and", "healthy"],
        ["write", "down", "your", "thoughts", "in", "a", "journal", "before", "going", "to", "sleep", "releasing", "your", "worries", "onto", "paper", "clears", "your", "mind", "helps", "you", "sleep", "much", "faster", "and", "reduces", "late", "night", "overthinking", "and", "anxiety"]
    ],

    productivity: [
        ["focus", "on", "only", "one", "important", "task", "at", "a", "time", "multitasking", "reduces", "your", "efficiency", "and", "brain", "power", "give", "your", "full", "attention", "to", "a", "single", "goal", "and", "you", "will", "finish", "it", "much", "faster", "with", "fewer", "mistakes"],
        ["use", "the", "twenty", "minute", "rule", "work", "with", "full", "focus", "for", "twenty", "five", "minutes", "then", "take", "a", "five", "minute", "break", "this", "technique", "keeps", "your", "mind", "fresh", "prevents", "burnout", "and", "boosts", "daily", "output"],
        ["keep", "your", "phone", "in", "another", "room", "while", "working", "or", "studying", "constant", "notifications", "destroy", "your", "focus", "and", "train", "your", "brain", "to", "be", "distracted", "quiet", "environment", "leads", "to", "deep", "work", "and", "better", "results"],
        ["plan", "your", "top", "three", "priorities", "the", "night", "before", "when", "you", "wake", "up", "you", "already", "know", "exactly", "what", "to", "do", "without", "wasting", "time", "thinking", "this", "gives", "you", "a", "clear", "roadmap", "for", "success"],
        ["learn", "to", "say", "no", "to", "things", "that", "do", "not", "align", "with", "your", "goals", "your", "time", "and", "energy", "are", "limited", "protect", "them", "by", "focusing", "only", "on", "what", "truly", "matters", "for", "your", "future", "growth"]
    ],

    health: [
        ["get", "at", "least", "fifteen", "minutes", "of", "natural", "sunlight", "every", "morning", "sunlight", "helps", "regulate", "your", "sleep", "cycle", "boosts", "vitamin", "d", "levels", "and", "improves", "your", "overall", "mood", "naturally"],
        ["practice", "deep", "breathing", "when", "you", "feel", "stressed", "inhale", "slowly", "for", "four", "seconds", "hold", "for", "four", "seconds", "and", "exhale", "slowly", "this", "instantly", "calms", "your", "nervous", "system", "and", "lowers", "heart", "rate"],
        ["screen", "time", "before", "bed", "ruins", "your", "sleep", "quality", "turn", "off", "your", "phone", "and", "laptop", "at", "least", "thirty", "minutes", "before", "sleeping", "read", "a", "book", "instead", "to", "relax", "your", "eyes", "and", "mind"],
        ["eating", "slowly", "and", "chewing", "your", "food", "properly", "improves", "digestion", "and", "prevents", "overeating", "it", "takes", "twenty", "minutes", "for", "your", "brain", "to", "realize", "your", "stomach", "is", "full", "enjoy", "every", "bite"],
        ["regular", "stretching", "improves", "body", "flexibility", "and", "relieves", "muscle", "tension", "spend", "few", "minutes", "stretching", "your", "neck", "back", "and", "legs", "daily", "to", "prevent", "body", "pain", "from", "long", "hours", "of", "sitting"]
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

// Start Screen Custom Timer DOM Elements
const toggleTimerBtn = document.getElementById("toggleTimerBtn");
const timerOptionsContainer = document.getElementById("timerOptionsContainer");
const selectedTimeDisplay = document.getElementById("selectedTimeDisplay");
const customTimeInput = document.getElementById("customTimeInput");

// Menu Modal Custom Timer DOM Elements
const toggleMenuTimerBtn = document.getElementById("toggleMenuTimerBtn");
const menuTimerOptionsContainer = document.getElementById("menuTimerOptionsContainer");
const selectedMenuTimeDisplay = document.getElementById("selectedMenuTimeDisplay");
const menuCustomTimeInput = document.getElementById("menuCustomTimeInput");

// About Modal Elements
const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAboutModalBtn = document.getElementById("closeAboutModalBtn");

// Toggle Start Screen Timer
if (toggleTimerBtn) {
    toggleTimerBtn.addEventListener("click", function () {
        timerOptionsContainer.style.display = timerOptionsContainer.style.display === "none" ? "block" : "none";
    });
}

// Toggle Menu Modal Timer
if (toggleMenuTimerBtn) {
    toggleMenuTimerBtn.addEventListener("click", function () {
        menuTimerOptionsContainer.style.display = menuTimerOptionsContainer.style.display === "none" ? "block" : "none";
    });
}

// About Modal Event Listeners
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

// Sync Preset Selection - Start Screen
timeOptions.forEach(opt => {
    opt.addEventListener("change", function () {
        if (customTimeInput) customTimeInput.value = "";
        syncTimeSelection(opt.value);
    });
});

// Custom Input - Start Screen
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

// Sync Preset Selection - Menu Modal
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

// Custom Input - Menu Modal
if (menuCustomTimeInput) {
    menuCustomTimeInput.addEventListener("change", function () {
        if (menuCustomTimeInput.value > 0) {
            timeOptions.forEach(opt => opt.checked = false);
            menuTimeOptions.forEach(opt => opt.checked = false);
            if (customTimeInput) customTimeInput.value = menuCustomTimeInput.value;
            syncTimeSelection(menuCustomTimeInput.value);

            menuTimerOptionsContainer.style.display = "none";
            menuArea.style.display = "none";
            resetGame();
            typingInput.focus();
            startTimer();
        }
    });
}

function getSelectedTime() {
    if (customTimeInput && Number(customTimeInput.value) > 0) {
        return Number(customTimeInput.value);
    }
    if (menuCustomTimeInput && Number(menuCustomTimeInput.value) > 0) {
        return Number(menuCustomTimeInput.value);
    }

    let selectedTime = 60;
    timeOptions.forEach(function (option) {
        if (option.checked) {
            selectedTime = Number(option.value);
        }
    });
    return selectedTime;
}

function getSelectedCategory() {
    let selectedCategory = "lifehacks";
    menuCategoryOptions.forEach(function (option) {
        if (option.checked) {
            selectedCategory = option.value;
        }
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

function syncCategorySelection(category) {
    menuCategoryOptions.forEach(opt => opt.checked = (opt.value === category));
}

function updatePauseBtnIcon() {
    pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
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

    updatePauseBtnIcon();
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

menuCategoryOptions.forEach(function (option) {
    option.addEventListener("change", function () {
        const selectedCategory = option.value;

        syncCategorySelection(selectedCategory);

        menuArea.style.display = "none";
        resetGame();
        typingInput.focus();
        startTimer();
    });
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
    const formattedStory = currentFullStoryArray.join(" ");
    fullStoryText.textContent = formattedStory;
    storyModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function () {
    storyModal.style.display = "none";
});

window.addEventListener("click", function (e) {
    if (e.target === storyModal) {
        storyModal.style.display = "none";
    }
    if (e.target === aboutModal) {
        aboutModal.style.display = "none";
        menuArea.style.display = "block";
    }
});
