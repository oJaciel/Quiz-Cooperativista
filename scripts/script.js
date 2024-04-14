console.log("Tá linkando?")

const questions = [
    {
        question: "Academia do povo...",
        answers: [
            {text: "Não tem nenhuma", correct: false},
            {text: "Tem várias", correct: false},
            {text: "Só tem uma", correct: true},
            {text: "Não existe", correct: false},
        ]
    },
    {
        question: "Primeiro clube brasileiro a ganhar",
        answers: [
            {text: "Liberta", correct: false},
            {text: "Sulamericana", correct: true},
            {text: "Brasileirão", correct: false},
            {text: "Mundial", correct: false},
        ]
    },
    {
        question: "Alario...",
        answers: [
            {text: "Meu bom amigo", correct: true},
            {text: "é matador", correct: false},
            {text: "não sei", correct: false},
            {text: "fiquei sem ideias", correct: false},
        ]
    },
    {
        question: "Academia do povo (de novo)...",
        answers: [
            {text: "Não tem nenhuma", correct: false},
            {text: "Tem várias", correct: false},
            {text: "Só tem uma", correct: true},
            {text: "Não existe", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetAnswers();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " - " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetAnswers() {
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block"
}

function showScore() {
    resetAnswers();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas`;
    nextButton.innerHTML = "Novo jogo";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

startQuiz();
