//PARTE 1
// Declaração de variáveis
const quizzContainer = document.querySelector("#quizz-container");
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const scoreContainer = document.querySelector("#score-container");

console.log(question);

const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;


// Perguntas
const questions = [
    {
      "question": "Quem é a maior que temos",
      "answers": [
        {
          "answer": "Fernanda",
          "correct": false
        },
        {
          "answer": "Nandinha",
          "correct": true
        },
        {
          "answer": "@Nandanascmnt",
          "correct": false
        },
        {
          "answer": "Euzinha",
          "correct": false
        },
      ]
    },
  
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]



//console.log(questions);


//PARTE 3
//Substituição do quizz para a primeira pergunta

function init(){

    //console.log("Start Game!!");
    createQuestion(0);

};


//PARTE 4
// cria uma pergunta
function createQuestion(i){

    //limpar questao anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn){
        btn.remove();
    });

    //PARTE 5
    //alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber =  question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i+1;

    //PARTE 6
    //insere as alternativas

    questions[i].answers.forEach(function(answer, i){

        //cria o template do botão
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        
        //letras
        const letterBtn = answerTemplate.querySelector(".btn-letter");

        //texto
        const answerText = answerTemplate.querySelector(".question-answer");

        //substituindo
        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        //verificar qual alternativa correta
        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Inserir a alternativa na tela
        answersBox.appendChild(answerTemplate);

        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir um evento de click no botão
        answerTemplate.addEventListener("click", function() {
                    
        //depois do atual question
        checkAnswer(this);
        });

    });

    //PARTE 7
    // Incrementar o número da questão para preencher 
    //a tela com a proxima pergunta usandO
    //a função de criação da questão.
    actualQuestion++; 
}


//PARTE 8
// Verificando resposta do usuário

function checkAnswer(btn) {

    // selecionar todos botões
    const buttons = answersBox.querySelectorAll("button");
  
    // verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {
  
      if(button.getAttribute("correct-answer") === "true") {
  
        button.classList.add("correct-answer");
  
        // checa se o usuário acertou a pergunta, se o usuario clicou na certa
        if(btn === button) {
          // incremento dos pontos
          points++;
        }
  
      } else {
  
        button.classList.add("wrong-answer");
  
      }
  
    });

// Exibir próxima pergunta
nextQuestion();

}


//PARTE 9
// Exibie a próxima pergunta no quizz
function nextQuestion() {

    // timer para usuário ver as respostas
    setTimeout(function() {
  
      // verifica se ainda há perguntas
      if(actualQuestion >= questions.length) {
        // apresenta a msg de sucesso
        showSucccessMessage();
        return;
      }
      createQuestion(actualQuestion);
  
    }, 700);
  
  }


//PARTE 10
// Mostra ou esconde o score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
  }
  


//PARTE 11
// Exibe a tela final
function showSucccessMessage() {

    hideOrShowQuizz();
  
    // trocar dados da tela de sucesso
  
    // calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);
    
    //verificar se a pessoa fez abaixo de 50% e caso sim, alterar a mensagem
   const displayMessage = document.querySelector("#mensage-change");
    if(score < 50){
        displayMessage.textContent = "Você não se saiu bem! Refaça o Quizz";
        
    }
  
    const displayScore = document.querySelector("#display-score span");
  
    displayScore.textContent = score.toString();
  
    // alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;
  
    // alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
  
  }



//PARTE 12
// Reiniciar Quizz
  //PARTE 12
  // Reiniciar Quizz
  const restartBtn = document.querySelector("#restart");
  
  restartBtn.addEventListener("click", function() {
  
    // zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
  
  });

//INICIALIZAÇÃO DO QUIZZ
init();
