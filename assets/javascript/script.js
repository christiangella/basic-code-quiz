var questions = [
    {
      question: 'How many times should an ID be used in an HTML page?',
      choices: ['One.', 'Two.', 'Three.', 'Four.'],
      answer: 'One.',
    }
    ,
    {
        question: 'Where is the lowest the script tag can go on an HTML page?',
        choices: ['The Doctype tag.', 'The Head tag.', 'The Body tag.', 'The HTML Tag.'],
        answer: 'The Body tag.',
    }
    ,
    {
        question: 'What does an API mean in full stacks programming?',
        choices: ['Asian Pacific Islander.', 'Application Programming Interface.', 'Application Process Integration.', 'Asset Priority Index.'],
        answer: 'Application Programming Interface.',
    }
    ,
    {
        question: 'What is NOT a functions of JQUERY?',
        choices: ['Traversing the DOM.', 'Manipulating the DOM.', 'Repairing errors in the DOM.', 'Simplying functions in Javascript.'],
        answer: 'Repairing errors in the DOM.',
    }
    ,
    {
        question: 'What is a limitation of a string?',
        choices: ['They are small and hard to utilize in coding.', 'They are not dynamic and cannot be changed.', 'Variable lengths make them unpredictable.', 'They do not have limitations.'],
        answer: 'They are not dynamic and cannot be changed.',
    },
];

var currentQuestionNumber = 0
var time = questions.length * 15
var timerClock;

var timeEl = document.getElementById('timeleft')

var questionEl = document.getElementById('question')
var choicesEl = document.getElementById('choice')
var responseEl = document.getElementById('response')

var startBtn = document.getElementById('start')
var playerNameEl = document.getElementById('yourName')
var submitBtn = document.getElementById('submitName')
  
var soundCorrect = new Audio('./assets/sfx/correct.wav')
var soundIncorrect = new Audio('./assets/sfx/incorrect.wav')
var soundFinish = new Audio('./assets/sfx/finish.wav')
var soundTimeUp = new Audio('./assets/sfx/timeup.wav')

function beginQuiz() {
    var startPageEl = document.getElementById('startPage');
    startPageEl.setAttribute('class', 'hide');

    questionEl.removeAttribute('class');
    
    timerClock = setInterval(clockFunction, 1000);
    timeEl.textContent = time;

    publishQuestion();
  }

function publishQuestion() {
    var questionPost = questions[currentQuestionNumber];

    var questionTitleEl = document.getElementById('questionTitle')
    questionTitleEl.textContent = questionPost.question;

    choicesEl.innerHTML = '';

    for (var i = 0; i < questionPost.choices.length; i++) {
        var choice = questionPost.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice')
        choiceNode.setAttribute('value', choice)

        choiceNode.textContent = '- ' + choice;

        choicesEl.appendChild(choiceNode)
    }
}

function answerPressed(event) {
    var answerButton = event.target;

    if (!answerButton.matches('.choice')) {
        return;
    }
    if (answerButton.value !==questions[currentQuestionNumber].answer) {
        time -= 10;

        if (time < 0) {
            time = 0
        }

        timeEl.textContent = time;
        soundIncorrect.play();
        responseEl.textContent = 'Incorrect!'
    } else {
        soundCorrect.play();
        responseEl.textContent = 'Correct!'
    }

    responseEl.setAttribute('class', 'response');
    setTimeout(function() {
        responseEl.setAttribute('class', 'response hide');
    }, 
    1000);

    currentQuestionNumber++;

    if (time <= 0 || currentQuestionNumber === questions.length) {
        endQuiz()
    } else {
        publishQuestion();
    }
}

function endQuiz() {
    clearInterval(timerClock)

    var endPageEl = document.getElementById('endPage')
    endPageEl.removeAttribute('class')

    var finalScoreEl = document.getElementById('finalScore');
    finalScoreEl.textContent = time * 10;

    questionEl.setAttribute('class', 'hide')

    setTimeout(function() {
    if (time >= 1) {
        soundFinish.play();
    } else {
        soundTimeUp.play();
    }
    },
    1000);
}

function clockFunction() {
    time--;
    timeEl.textContent = time

    if (time <= 0 ) {
        endQuiz()
    }
}

function saveHighScore() {
    var playerName = playerNameEl.value.trim();
    if (playerName !== '') {
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

        var newScore = {
            score: time,
            playerName: playerName,
        };

        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        window.location.href = 'scores.html';
    }
}

function identifyEnter(event) {
    if (event.key === 'Enter') {
        saveHighScore();
    }
}

startBtn.onclick = beginQuiz
choicesEl.onclick = answerPressed
submitBtn.onclick = saveHighScore
playerNameEl.onkeyup = identifyEnter

console.log(highscores)