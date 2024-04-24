const questions = [

    {
        question: "Princípios do Cooperativismo: Qual dos seguintes não é um dos sete princípios básicos do cooperativismo?",
        answers: [
            { text: "A) Autonomia e independência", correct: false },
            { text: "B) Ajuda mútua", correct: false },
            { text: "C) Lucro máximo (Resposta Correta)", correct: true },
            { text: "D) Educação, formação e informação", correct: false },
        ]
    },

    {
        question: "História do Cooperativismo: Em que país e século o movimento cooperativista moderno teve início?",
        answers: [
            { text: "A) Estados Unidos, século XVIII", correct: false },
            { text: "B) França, século XIX", correct: false },
            { text: "C) Inglaterra, século XIX (Resposta Correta)", correct: true },
            { text: "D) Alemanha, século XVIII", correct: false },
        ]
    },

    {
        question: "Modelos de Cooperativas: Qual tipo de cooperativa é primariamente formada por consumidores que compram bens em maior quantidade para obter preços mais baixos?",
        answers: [
            { text: "A) Cooperativa de crédito", correct: false },
            { text: "B) Cooperativa de produtores", correct: false },
            { text: "C) Cooperativa de trabalho", correct: false },
            { text: "D) Cooperativa de consumidores (Resposta Correta)", correct: true },
        ]
    },

    {
        question: "Impacto Social e Econômico: Qual dos seguintes é um potencial benefício das cooperativas para a economia local?",
        answers: [
            { text: "A) Concentração de renda", correct: false },
            { text: "B) Redução de empregos", correct: false },
            { text: "C) Fomento à autonomia local (Resposta Correta)", correct: true },
            { text: "D) Aumento da importação de produtos", correct: false },
        ]
    },

    {
        question: "Desafios do Cooperativismo Moderno: Qual destes é considerado um desafio significativo para cooperativas no contexto globalizado?",
        answers: [
            { text: "A) Aumento do protecionismo comercial", correct: false },
            { text: "B) Diminuição da concorrência", correct: false },
            { text: "C) Expansão rápida demais", correct: false },
            { text: "D) Necessidade de adotar inovações tecnológicas (Resposta Correta)", correct: true },
        ]
    },

    {
        question: "Legislação e Políticas Públicas: No contexto brasileiro, qual órgão é responsável por registrar as cooperativas?",
        answers: [
            { text: "A) Banco Central do Brasil", correct: false },
            { text: "B) Receita Federal do Brasil", correct: false },
            { text: "C) Organização das Cooperativas Brasileiras (OCB) (Resposta Correta)", correct: true },
            { text: "D) Instituto Nacional do Seguro Social (INSS)", correct: false },
        ]
    },

    {
        question: "Inovação e Tecnologia nas Cooperativas: Como a tecnologia de inteligência artificial pode ser utilizada por uma cooperativa de crédito?",
        answers: [
            { text: "A) Para aumentar as taxas de juros", correct: false },
            { text: "B) Para melhorar a análise de risco de crédito (Resposta Correta)", correct: true },
            { text: "C) Para reduzir o número de associados", correct: false },
            { text: "D) Para limitar o acesso a financiamentos", correct: false },
        ]
    },

    {
        question: "Cooperativismo e Sustentabilidade: Que prática uma cooperativa agrícola pode adotar para promover a sustentabilidade ambiental?",
        answers: [
            { text: "A) Uso intensivo de agrotóxicos", correct: false },
            { text: "B) Monocultura extensiva", correct: false },
            { text: "C) Rotatividade de culturas (Resposta Correta)", correct: true },
            { text: "D) Expansão descontrolada de terras", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    nextButton.innerHTML = "Próximo"
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
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetAnswers() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
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
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
