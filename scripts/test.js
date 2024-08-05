
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const quizStart = document.querySelector('.quiz-start');
const quizQuestion = document.querySelector('.quiz-question');
const quizResult = document.querySelector('.quiz-result');
const resultContainer = document.getElementById('result-container');

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let userAnswers = [];

const questions = [
    {
        question: "What is the closest planet to the Sun?",
        answers: ["Mercury", "Venus", "Earth", "Mars"],
        correct: "Mercury"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "Which planet has the most moons?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Saturn"
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Jupiter", "Saturn", "Neptune"],
        correct: "Jupiter"
    },
    {
        question: "Which planet is known for its rings?",
        answers: ["Venus", "Saturn", "Uranus", "Neptune"],
        correct: "Saturn"
    },
    {
        question: "Which planet is closest to Earth?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: "Venus"
    },
    {
        question: "What is the hottest planet in our solar system?",
        answers: ["Mercury", "Venus", "Earth", "Mars"],
        correct: "Venus"
    }
];

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    quizStart.classList.add('display-none');
    quizQuestion.classList.remove('display-none');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionText.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('answer-btn');
        button.addEventListener('click', selectAnswer);
        answersContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('display-none');
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = questions[currentQuestionIndex].correct;
    userAnswers.push({
        question: questions[currentQuestionIndex].question,
        selected: selectedButton.innerText,
        correct: correct
    });
    if (selectedButton.innerText === correct) {
        correctAnswers++;
    } else {
        wrongAnswers++;
    }
    Array.from(answersContainer.children).forEach(button => {
        button.classList.add(button.innerText === correct ? 'correct' : 'wrong');
    });
    nextBtn.classList.remove('display-none');
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerText = "See Results";
        nextBtn.addEventListener('click', showResults);
    }
}

function showResults() {
    quizQuestion.classList.add('display-none');
    quizResult.classList.remove('display-none');
    resultContainer.innerHTML = `
        <p>You got ${correctAnswers} correct and ${wrongAnswers} wrong answers!</p>
        <h3>Review your answers:</h3>
        <ul>
            ${userAnswers.map(answer => `
                <li>
                    <strong>Question:</strong> ${answer.question} <br>
                    <strong>Your answer:</strong> ${answer.selected} <br>
                    <strong>Correct answer:</strong> ${answer.correct}
                </li>
            `).join('')}
        </ul>
    `;
}

function restartQuiz() {
    location.reload();
}
