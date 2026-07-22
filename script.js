// Stories dataset with categories and multiple story variations
const stories = {
    funny: [
        [
            "the", "cat", "ate", "my", "burger", "and", "ran", "away", "laughing",
            "it", "wore", "a", "tiny", "hat", "and", "danced", "on", "the", "table",
            "then", "it", "spilled", "the", "milk", "all", "over", "the", "clean", "floor",
            "my", "dog", "just", "sat", "there", "watching", "the", "funny", "show",
            "everyone", "in", "the", "house", "could", "not", "stop", "laughing", "today",
            "after", "that", "the", "cat", "tried", "to", "fly", "out", "the", "window",
            "it", "landed", "softly", "on", "a", "giant", "fluffy", "pillow", "outside"
        ],
        [
            "a", "monkey", "stole", "my", "sunglasses", "at", "the", "local", "zoo",
            "it", "put", "them", "on", "and", "started", "taking", "cool", "selfies",
            "the", "zookeeper", "offered", "a", "banana", "to", "get", "them", "back",
            "but", "the", "smart", "monkey", "wanted", "an", "ice", "cream", "instead",
            "all", "the", "tourists", "clapped", "and", "cheered", "for", "the", "stylish", "ape",
            "it", "was", "the", "funniest", "moment", "of", "our", "entire", "weekend", "trip"
        ]
    ],

    horror: [
        [
            "dark", "night", "ghost", "was", "behind", "the", "door", "silently",
            "a", "cold", "wind", "blew", "through", "the", "broken", "window",
            "suddenly", "the", "lights", "went", "out", "and", "a", "scream", "was", "heard",
            "shadows", "started", "moving", "slowly", "across", "the", "old", "hallway",
            "no", "one", "dared", "to", "look", "back", "in", "that", "scary", "house",
            "footsteps", "echoed", "closer", "and", "closer", "from", "the", "dark", "basement",
            "the", "door", "locked", "itself", "and", "the", "whispers", "grew", "louder"
        ],
        [
            "an", "old", "abandoned", "mansion", "stood", "alone", "on", "the", "foggy", "hill",
            "strange", "red", "lights", "flickered", "from", "the", "top", "floor", "windows",
            "we", "heard", "a", "piano", "playing", "a", "creepy", "melody", "by", "itself",
            "the", "air", "became", "heavy", "and", "it", "was", "hard", "to", "breathe",
            "a", "shadowy", "figure", "appeared", "at", "the", "end", "of", "the", "corridor",
            "running", "away", "was", "our", "only", "chance", "to", "survive", "that", "night"
        ]
    ],

    adventure: [
        [
            "we", "crossed", "the", "deep", "river", "and", "found", "hidden", "treasure",
            "the", "map", "led", "us", "through", "a", "dense", "and", "mysterious", "jungle",
            "we", "climbed", "the", "highest", "mountain", "before", "the", "sun", "went", "down",
            "ancient", "secrets", "were", "waiting", "for", "us", "inside", "the", "cave",
            "it", "was", "the", "most", "exciting", "journey", "of", "our", "entire", "lives",
            "wild", "animals", "watched", "us", "from", "the", "trees", "as", "we", "marched",
            "finally", "a", "golden", "chest", "sparkled", "under", "the", "bright", "moonlight"
        ],
        [
            "sailing", "across", "the", "stormy", "ocean", "the", "pirates", "spotted", "an", "island",
            "thick", "fog", "covered", "the", "shores", "of", "the", "unexplored", "land",
            "we", "unloaded", "our", "gear", "and", "stepped", "onto", "the", "golden", "sand",
            "strange", "birds", "were", "singing", "high", "up", "in", "the", "palm", "trees",
            "a", "hidden", "pathway", "guided", "us", "towards", "an", "ancient", "temple",
            "every", "step", "brought", "a", "new", "challenge", "and", "a", "thrilling", "discovery"
        ]
    ]
};

let words = [];
let currentWord = 0;
let score = 0;
let timeLeft = 60;
let timer;
let isPaused = false;

const wordElement = document.getElementById("word");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const timerElement = document.getElementById("timer");

const startScreen = document.getElementById("startScreen");
const gameArea = document.getElementById("gameArea");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const typingInput = document.getElementById("typingInput");

const settingsBtn = document.getElementById("settingsBtn");
const settingsArea = document.getElementById("settingsArea");

const timeOptions = document.getElementsByName("gameTime");
const menuTimeOptions = document.getElementsByName("menuGameTime");

const categoryOptions = document.getElementsByName("storyCategory");
const menuCategoryOptions = document.getElementsByName("menuStoryCategory");

function getSelectedTime() {
    let selectedTime = 60;
    timeOptions.forEach(function(option){
        if(option.checked){
            selectedTime = Number(option.value);
        }
    });
    return selectedTime;
}

function getSelectedCategory(){
    let selectedCategory = "funny";
    categoryOptions.forEach(function(option){
        if(option.checked){
            selectedCategory = option.value;
        }
    });
    return selectedCategory;
}

// Dynamically select a story and adjust word count based on selected time
function prepareStoryWords(category, time) {
    const categoryStories = stories[category];
    // Select a random story variation
    const randomStory = categoryStories[Math.floor(Math.random() * categoryStories.length)];

    // Determine target word length according to timer duration
    let wordCount;
    if (time <= 15) {
        wordCount = 12;
    } else if (time <= 30) {
        wordCount = 25;
    } else if (time <= 60) {
        wordCount = 45;
    } else {
        wordCount = randomStory.length;
    }

    return randomStory.slice(0, wordCount);
}

function syncTimeSelection(timeVal) {
    timeOptions.forEach(opt => opt.checked = (Number(opt.value) === Number(timeVal)));
    menuTimeOptions.forEach(opt => opt.checked = (Number(opt.value) === Number(timeVal)));
}

function syncCategorySelection(category) {
    categoryOptions.forEach(opt => opt.checked = (opt.value === category));
    menuCategoryOptions.forEach(opt => opt.checked = (opt.value === category));
}

function resetGame(){
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
}

function startTimer(){
    clearInterval(timer);

    timer = setInterval(function(){
        timeLeft--;
        timerElement.textContent = "Time: " + timeLeft;

        if(timeLeft <= 0){
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
            wordElement.textContent = "Story Complete! 📖";
            messageElement.textContent = "Final Score: " + score;
            typingInput.disabled = true;
        }
        typingInput.value = "";
    } else {
        messageElement.textContent = "Keep trying! ❌";
    }
});

startBtn.addEventListener("click", function () {
    const selectedCategory = getSelectedCategory();
    const selectedTime = getSelectedTime();

    syncCategorySelection(selectedCategory);
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

settingsBtn.addEventListener("click", function () {
    if (settingsArea.style.display === "block") {
        settingsArea.style.display = "none";
    } else {
        settingsArea.style.display = "block";
    }
});

const menuBtn = document.getElementById("menuBtn");
const menuArea = document.getElementById("menuArea");

const homeBtn = document.getElementById("homeBtn");
const resumeBtn = document.getElementById("resumeBtn");

menuBtn.addEventListener("click", function () {
    if (menuArea.style.display === "block") {
        menuArea.style.display = "none";
        if (isPaused && timeLeft > 0) {
            startTimer();
            isPaused = false;
            typingInput.disabled = false;
            typingInput.focus();
        }
    } else {
        menuArea.style.display = "block";
        clearInterval(timer);
        isPaused = true;
        typingInput.disabled = true;
    }
});

menuTimeOptions.forEach(function(option){
    option.addEventListener("change", function(){
        const selectedTime = Number(option.value);
        
        syncTimeSelection(selectedTime);

        menuArea.style.display = "none";
        resetGame();
        typingInput.focus();
        startTimer();
    });
});

menuCategoryOptions.forEach(function(option){
    option.addEventListener("change", function(){
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
    }
});

homeBtn.addEventListener("click", function () {
    clearInterval(timer);
    isPaused = false;

    gameArea.style.display = "none";
    startScreen.style.display = "block";
    menuArea.style.display = "none";
});
