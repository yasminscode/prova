const muscles = [
    {
        id: 1,
        name: "Músculo Peitoral Maior",
        origin: "Metade medial da clavícula, esterno e cartilagens costais (1ª a 6ª).",
        insertion: "Crista do tubérculo maior do úmero.",
        innervation: "Nervos peitorais medial e lateral.",
        func: "Adução (aproxima o braço do corpo), rotação medial e flexão do braço.",
        image: "1.jpg"
    },
    {
        id: 2,
        name: "Músculo Occipitofrontal",
        origin: "Linha nucal superior (occipital) e aponeurose epicrânica.",
        insertion: "Pele das sobrancelhas e da testa.",
        innervation: "Ramos temporais e auriculares posteriores do Nervo Facial (NC VII).",
        func: "Eleva as sobrancelhas e franze a testa (surpresa).",
        image: "2.jpg"
    },
    {
        id: 3,
        name: "Músculo Reto do Abdome",
        origin: "Sínfise e crista púbica.",
        insertion: "Processo xifoide e cartilagens costais (5ª a 7ª).",
        innervation: "Nervos toracoabdominais (T7 a T12).",
        func: "Flexão do tronco e compressão do abdome.",
        image: "3.jpg"
    },
    {
        id: 4,
        name: "Músculo Platisma",
        origin: "Pele e tecido subcutâneo do tórax superior (região clavicular).",
        insertion: "Margem inferior da mandíbula e pele da metade inferior da face.",
        innervation: "Ramo cervical do Nervo Facial (NC VII).",
        func: "Tensiona a pele do pescoço e deprime a mandíbula (tensão/terror).",
        image: "4.jpg"
    },
    {
        id: 5,
        name: "Músculos Auriculares (Anterior, Superior e Posterior)",
        origin: "Fáscia temporal e processo mastoide.",
        insertion: "Cartilagem da orelha.",
        innervation: "Ramos do Nervo Facial (NC VII).",
        func: "Movem a orelha (vestigial).",
        image: "5.jpg"
    },
    {
        id: 6,
        name: "Músculo Esternocleidomastóideo (ECM)",
        origin: "Manúbrio do esterno e terço medial da clavícula.",
        insertion: "Processo mastoide (temporal) e linha nucal superior (occipital).",
        innervation: "Nervo Acessório (NC XI).",
        func: "Unilateral: Inclina a cabeça para o mesmo lado e gira para o lado oposto. Bilateral: Flexiona o pescoço.",
        image: "6.jpg"
    },
    {
        id: 7,
        name: "Músculo Mentual",
        origin: "Fossa incisiva da mandíbula.",
        insertion: "Pele do mento (queixo).",
        innervation: "Ramo marginal da mandíbula do Nervo Facial (NC VII).",
        func: "Eleva e protrui o lábio inferior (expressão de \"bico\").",
        image: "7.jpg"
    },
    {
        id: 8,
        name: "Músculo Orbicular do Olho",
        origin: "Margem medial da órbita, ligamento palpebral medial e osso lacrimal.",
        insertion: "Pele ao redor da órbita e pálpebras.",
        innervation: "Ramos temporais e zigomáticos do Nervo Facial (NC VII).",
        func: "Fecha as pálpebras (piscar suave ou fechar com força).",
        image: "8.jpg"
    }
];

// Mapeamento das propriedades e seus textos formatados
const propertyLabels = {
    origin: "ORIGEM",
    insertion: "INSERÇÃO",
    innervation: "INERVAÇÃO",
    func: "FUNÇÃO"
};

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Elementos da interface
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const imageEl = document.getElementById("muscle-image");
const progressEl = document.getElementById("progress");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreTextEl = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// Função para gerar todas as questões do Quiz
function generateQuestions() {
    questions = [];
    
    // Para cada músculo, geramos 2 perguntas exclusivas
    muscles.forEach(muscle => {
        // Pergunta 1: Origem e Função
        questions.push(createQuestionObject(muscle, 'origin', 'func'));
        // Pergunta 2: Inserção e Inervação
        questions.push(createQuestionObject(muscle, 'insertion', 'innervation'));
    });

    // Embaralha todas as 16 perguntas geradas
    questions = questions.sort(() => Math.random() - 0.5);
}

// Cria um objeto de pergunta formatado e gera as alternativas incorretas
function createQuestionObject(correctMuscle, prop1, prop2) {
    const questionText = `Analisando a imagem em destaque, qual é a ${propertyLabels[prop1]} e a ${propertyLabels[prop2]} do músculo indicado?`;
    
    let options = [];
    
    // 1. Adiciona a resposta correta
    options.push({
        text: `<strong>${correctMuscle.name}</strong><br>• ${propertyLabels[prop1]}: ${correctMuscle[prop1]}<br>• ${propertyLabels[prop2]}: ${correctMuscle[prop2]}`,
        isCorrect: true
    });

    // 2. Cria 3 alternativas incorretas (usando os dados de outros músculos)
    const otherMuscles = muscles.filter(m => m.id !== correctMuscle.id).sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 3; i++) {
        let wrongMuscle = otherMuscles[i];
        options.push({
            text: `<strong>${wrongMuscle.name}</strong><br>• ${propertyLabels[prop1]}: ${wrongMuscle[prop1]}<br>• ${propertyLabels[prop2]}: ${wrongMuscle[prop2]}`,
            isCorrect: false
        });
    }

    // Embaralha as alternativas
    options = options.sort(() => Math.random() - 0.5);

    return {
        muscleImage: correctMuscle.image,
        questionText: questionText,
        options: options
    };
}

// Função para exibir a questão atual na tela
function loadQuestion() {
    nextBtn.classList.add("hidden");
    const currentQuestion = questions[currentQuestionIndex];
    
    progressEl.innerText = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;
    questionTextEl.innerText = currentQuestion.questionText;
    imageEl.src = currentQuestion.muscleImage;
    
    optionsContainerEl.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add("option-btn");
        
        button.addEventListener("click", () => selectAnswer(button, option.isCorrect));
        optionsContainerEl.appendChild(button);
    });
}

// Lida com o clique do usuário na alternativa
function selectAnswer(selectedButton, isCorrect) {
    const allButtons = document.querySelectorAll(".option-btn");
    
    // Desativa todos os botões e mostra cores
    allButtons.forEach(btn => {
        btn.disabled = true;
        // Se quisermos revelar a correta mesmo se errar, podemos adicionar lógica aqui, 
        // mas vamos aplicar apenas ao selecionado e revelar a certa
    });

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
        // Encontra e pinta de verde o botão que era o correto
        const currentQuestion = questions[currentQuestionIndex];
        const correctIndex = currentQuestion.options.findIndex(opt => opt.isCorrect);
        allButtons[correctIndex].classList.add("correct");
    }

    nextBtn.classList.remove("hidden");
}

// Passa para a próxima questão ou finaliza
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Exibe tela final
function showResults() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    progressEl.innerText = "Finalizado";
    scoreTextEl.innerText = `Você acertou ${score} de ${questions.length} questões!`;
}

// Reinicia o quiz
restartBtn.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    generateQuestions();
    loadQuestion();
});

// Inicialização
generateQuestions();
loadQuestion();