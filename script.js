let currentQuestionIndex = 0;
let lives = 3;
let score = 0;
let questions = [];
let mistakes = [];  // Track the user's mistakes

const homeScreen = document.querySelector('.home-screen');
const quizScreen = document.querySelector('.quiz-screen');
const gameOverScreen = document.querySelector('.game-over');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const livesEl = document.getElementById('lives');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const restartButton = document.getElementById('restart');
const nextQuestionButton = document.getElementById('next-question');
const mistakesList = document.getElementById('mistakes');

// Define questions for each difficulty level
const easyQuestions = [
    { question: "WHat does the acronym TWEAN mean?", answers: ["Tropical, Water, Earth, Animals, Nutrients", "Troposphere, Wind, Exosphere, Atmosphere, Nutrient", "Temperature, Water, Energy, Atmosphere, Nutrients", "Tectonics, Weathering, Earth, Asthenosphere, Nitrogen"], correct: 2 },
    { question: "What factor is the most important ingredient of the different biological process?", answers: ["Temperature", "Water", "Atmosphere", "Nutrients"], correct: 1 },
    { question: "What did the atmosphere contain which made the earth green?", answers: ["Nitrogen", "Oxygen", "Methane", "Carbon dioxide"], correct: 2 },
    { question: "Which organism can survive without water?", answers: ["Human", "Plants", " Animals", "Microbes"], correct: 3 },
    { question: "What is the range of a just right temperature?", answers: ["(-11) - 150", "(-12) - 112", "(-15) - 115", "(-15) - 125"], correct: 2 },
    { question: "What factor influences how quickly atoms, molecules, or organisms move?", answers: ["Water", "Temperature", "Nutrients", "Energy"], correct: 1 },
    { question: "How thicker is venus’ atmosphere compared to Earth’s?", answers: ["10x", "500x", "50x", "100x"], correct: 3 },
    { question: "What is an example of toxic water?", answers: ["Drinking Water", "Flood", "Lake water", "Sea water"], correct: 1 },
    { question: "Earth exists for how many years?", answers: ["2.543 billion years", "3.345 billion years", "5.432 billion years", "4.543 billion years "], correct: 3 },
    { question: "What factor is also called the insulating blanket or protective shield??", answers: ["Atmosphere", "Water", "Energy", "Nutrients"], correct: 0 },
   
];

const mediumQuestions = [
    { question: "Life started from _________, which feeds on photosynthesis.", answers: ["Plankton", "Plant", "Animal", "Bacteria"], correct: 0 },
    { question: "How does a planet's surface temperature affect the development of life?", answers: ["extreme temperatures, either too hot or too cold, prevent life from developing.", " Surface temperature has no effect on life.", "Only warm temperatures are necessary for life to thrive.", "Only cold temperatures are necessary for life to thrive."], correct: 2 },
    { question: "How does a planet's atmosphere contribute to its ability to support life?", answers: ["It blocks harmful radiation from the star.", "It keeps the planet warm by trapping heat.", "It provides essential gases like oxygen and carbon dioxide.", "All of the Above"], correct: 0 },
    { question: "What is the significance of a planet's magnetic field in protecting life?", answers: ["It helps create day and night cycles.", "It protects the planet from harmful solar and cosmic radiation.", "It provides oxygen for life to survive.", "It helps with the planet’s rotation."], correct: 3 },
    { question: "What does the acronym PCG mean, where it starts to break apart when there is too much temperature?", answers: ["Phosphorous, Carbon, Glucose", "Protein, Carbohydrate, Glucose", "Protein, Carbohydrate, Genetic Material", "Phosphorous, Carbohydrate, Genetic Material"], correct: 1 },
   
];

const hardQuestions = [
    { question: "What is the “habitable zone” (or “Goldilocks zone”) of a star, and why is it crucial for planet habitability?", answers: ["The region around a star where temperatures are high enough to support nuclear fusion.", "The region where liquid water can exist on a planet’s surface.", "The region around a star where planets have low gravity.", "The region where a planet has an atmosphere that can trap heat effectively"], correct: 1 },
    { question: "Which of the following atmospheric properties is critical for maintaining a stable surface temperature on a potentially habitable planet?", answers: ["High concentrations of methane and ammonia", "A thick layer of carbon dioxide to trap heat through the greenhouse effect", "A high amount of nitrogen to reduce the risk of solar flares", "A low concentration of oxygen to prevent excessive oxidation"], correct: 1 },
    { question: "Why is Venus’ surface too hot for life?", answers: ["Because its atmosphere is mostly made if greenhouse gasses", "Because it is closer to the sun", "Because it has insufficient gravity to hold life", "Because of its size"], correct: 0 },
    { question: "Why is the presence of liquid water essential for a planet's habitability?", answers: ["Water helps regulate a planet’s temperature.", "Water is necessary for chemical reactions that support life.", "Water provides energy for all life forms.", "Water protects the planet from harmful radiation."], correct: 1 },
    { question: "What happens to the chemicals a cell needs for energy when the water is not enough.", answers: ["It will flourish", "The chemicals will be transported into the cell", "It will not be transported and dissolved", "It will vanish."], correct: 2 },
    
    
];

const difficultyButtons = document.querySelectorAll('.difficulty-btn');
difficultyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const difficulty = e.target.id;
        startGame(difficulty);
    });
});

function startGame(difficulty) {
    homeScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    gameOverScreen.style.display = 'none';
    
    loadQuestions(difficulty);
    shuffleQuestions();
    currentQuestionIndex = 0;
    lives = 3;
    score = 0;
    livesEl.textContent = `Lives: ${lives}`;
    mistakes = [];  // Reset mistakes when restarting the game
    nextQuestionButton.style.display = 'none';
    loadQuestion();
}

function loadQuestions(difficulty) {
    if (difficulty === 'easy') {
        questions = easyQuestions;
    } else if (difficulty === 'medium') {
        questions = mediumQuestions;
    } else if (difficulty === 'hard') {
        questions = hardQuestions;
    }
}

function shuffleQuestions() {
    questions = questions.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length && lives > 0) {
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        resultEl.textContent = '';

        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((button, index) => {
            button.textContent = currentQuestion.answers[index];
            button.disabled = false;
            button.style.backgroundColor = '';
            button.onclick = () => checkAnswer(index, button);
        });
        
        nextQuestionButton.style.display = 'none'; // Hide the next button initially
    } else {
        endGame();
    }
}

function checkAnswer(selectedIndex, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    if (selectedIndex === currentQuestion.correct) {
        score++;
        selectedButton.style.backgroundColor = '#4CAF50'; // Correct color
        resultEl.textContent = 'Correct!';
    } else {
        lives--;
        livesEl.textContent = `Lives: ${lives}`;
        selectedButton.style.backgroundColor = '#ff4d4d'; // Incorrect color
        resultEl.textContent = 'Incorrect!';
        
        // Save the mistake to show at the end
        mistakes.push({
            question: currentQuestion.question,
            userAnswer: currentQuestion.answers[selectedIndex],
            correctAnswer: currentQuestion.answers[currentQuestion.correct],
        });
        
        answerButtons[currentQuestion.correct].style.backgroundColor = '#4CAF50'; // Highlight correct answer
    }

    answerButtons.forEach(button => button.disabled = true); // Disable all buttons after selection
    nextQuestionButton.style.display = 'block'; // Show the next button
}

nextQuestionButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

function endGame() {
    quizScreen.style.display = 'none';
    gameOverScreen.style.display = 'block';
    scoreEl.textContent = score;
    document.body.style.backgroundColor = '#ffdddd'; // Red background for game over

    // Display the mistakes list
    const mistakesUl = document.getElementById('mistakes');
    mistakesUl.innerHTML = ''; // Clear previous mistakes
    mistakes.forEach(mistake => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Question:</strong> ${mistake.question} <br>
            <strong>Your Answer:</strong> ${mistake.userAnswer} <br>
            <strong>Correct Answer:</strong> ${mistake.correctAnswer}
        `;
        mistakesUl.appendChild(li);
    });
}

restartButton.addEventListener('click', () => {
    homeScreen.style.display = 'block';
    quizScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    document.body.style.backgroundColor = '#e8f8f5'; // Reset background
});