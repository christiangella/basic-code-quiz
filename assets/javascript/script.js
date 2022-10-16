/* FUNCTION: Lists questions for the quiz. */
var questions = [
    {
      question: 'Which one of these is not a loop structure?',
      choices: ['for.', 'while.', 'do-while.', 'if.'],
      answer: 'if.',
    },
    {
        question: 'An if/else statement is enclosed within _____.',
        choices: ['Quotes.', 'Parenthesis.', 'Curly brackets.', 'Square brackets.'],
        answer: 'Parenthesis.',
    },
    {
        question: 'Where is the lowest the script tag can go on an HTML page?',
        choices: ['The Doctype tag.', 'The Head tag.', 'The Body tag.', 'The HTML Tag.'],
        answer: 'The Body tag.',
    },
    {
        question: 'What does an API mean in full stacks programming?',
        choices: ['Asian Pacific Islander.', 'Application Programming Interface.', 'Application Process Integration.', 'Asset Priority Index.'],
        answer: 'Application Programming Interface.',
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: 'What is NOT a functions of JQUERY?',
        choices: ['Repairing errors in the DOM.','Traversing the DOM.', 'Manipulating the DOM.', 'Simplying functions in Javascript.'],
        answer: 'Repairing errors in the DOM.',
    },
    {
        question: 'What is a limitation of a string?',
        choices: ['They are small and hard to use.', 'They are not dynamic and do not change.', 'Variable lengths make them unpredictable.', 'They do not have limitations.'],
        answer: 'They are not dynamic and do not change.',
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
      },
];

/* FUNCTION: Allows to move between questions and establish time. */
var currentQuestionNumber = 0
var time = questions.length * 15
var timerClock;

/* FUNCTION: Referemces IDs in the HTML page. */
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

var highscores = [];


/* FUNCTION: Defines function for what happens when the function beginQuiz starts. */
function beginQuiz() {
    /* FUNCTION: Changes the intro starting page to be hidden by applying class. */
    var startPageEl = document.getElementById('startPage');
    startPageEl.setAttribute('class', 'hide');

    /* FUNCTION: Removes the class that hides the questions page. */
    questionEl.removeAttribute('class');
    
    /* FUNCTION: Sets the time to count down and prints it to HTML page. */
    timerClock = setInterval(clockFunction, 1000);
    timeEl.textContent = time;

    /* FUNCTION: Calls upon the function publishQuestion to print question to page. */
    publishQuestion();
  }

/* FUNCTION: Defines function for what happens when the function publishQuestion begins. */
function publishQuestion() {
    /* FUNCTION: Indexes question from the array of questions in the variable array. */
    var questionPost = questions[currentQuestionNumber];

    /* FUNCTION: Changes the title element by indexing the question from the array. */
    var questionTitleEl = document.getElementById('questionTitle')
    questionTitleEl.textContent = questionPost.question;

    /* FUNCTION: Removes previous questions. */
    choicesEl.innerHTML = '';

    /* FUNCTION: Creates conditions for questions to appear on the screen.*/
    for (var i = 0; i < questionPost.choices.length; i++) {
        var choice = questionPost.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice')
        choiceNode.setAttribute('value', choice)
        choiceNode.textContent = '- ' + choice;

    /* FUNCTION: Displays the text onto the page. */
        choicesEl.appendChild(choiceNode)
    }
}

/* FUNCTION: Defines function for what happens when an answer is selected. */
function answerPressed(event) {
    var answerButton = event.target;

    /* FUNCTION: Forces reaction ONLY if an answer is selected. */
    if (!answerButton.matches('.choice')) {
        return;
    }
    /* FUNCTION: Establishes logic for incorrect answer: penalizes timer. */
    if (answerButton.value !==questions[currentQuestionNumber].answer) {
        time -= 60;
    /* FUNCTION: If timer goes to zero or beyond, time sets to zero. */
        if (time < 0) {
            time = 0
        }

    /* FUNCTION: Updates time after penalization. */
        timeEl.textContent = time;
    /* FUNCTION: Plays sound effect to indicate incorrect answer and publishes response. */
        soundIncorrect.play();
        responseEl.textContent = 'Incorrect!'
    } else {
    /* FUNCTION: Plays sound effect to indicate correct answer and publishes response. */
        soundCorrect.play();
        responseEl.textContent = 'Correct!'
    }

    /* FUNCTION: Establishes conditions for a response to show up based on answer.  */
    responseEl.setAttribute('class', 'response');
    setTimeout(function() {
        responseEl.setAttribute('class', 'response hide');
    }, 
    1500);

    /* FUNCTION: Moves to next question once answer is given. */
    currentQuestionNumber++;

    /* FUNCTION: Establishes conditions for quiz ending: time equal zero OR questions length completed. */
    if (time <= 0 || currentQuestionNumber === questions.length) {
    /* FUNCTION: Ends quiz if either of these conditions are met. */
        endQuiz()
    } else {
    /* FUNCTION: Calls upon publishQuestion function to move to next question if conditions are not met. */
        publishQuestion();
    }
}

/* FUNCTION: Defines function for when the quiz ends. */
function endQuiz() {
    /* FUNCTION: Stops the clock from continuing its interval. */
    clearInterval(timerClock)

    /* FUNCTION: Removes the hide class from the end page. */
    var endPageEl = document.getElementById('endPage')
    endPageEl.removeAttribute('class')
    /* FUNCTION: Adds the hide class from the question page. */
    questionEl.setAttribute('class', 'hide')

    /* FUNCTION: Publishes the score to the page. Calculates score. */
    var finalScoreEl = document.getElementById('finalScore');
    finalScoreEl.textContent = time;

    /* FUNCTION: Plays different music based on whether quiz was successful or failure. */
    setTimeout(function() {
    if (time >= 1) {
        soundFinish.play();
    } else {
        soundTimeUp.play();
    }
    },
    /* FUNCTION: Delays sound so not to overlap with sound effect. */
    1000);
}

/* FUNCTION: Defines the function for the clock to count down. */
function clockFunction() {
    /* FUNCTION: Allows time to progress at a set interval and publishes to page. */
    time--;
    timeEl.textContent = time

    /* FUNCTION: Ends quiz if time ends by calling on endQuiz function. */
    if (time <= 0 ) {
        endQuiz()
    }
}

/* FUNCTION: Defines the function for saving scores. */
function saveResults() {
    /* FUNCTION: Records player name based on input. */
    var playerName = playerNameEl.value.trim();

    /* FUNCTION: Creates condition that value cannot be empty. */
    if (playerName !== '') {
    /* FUNCTION: Retrieves any stored values OR sets new array. */
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    /* FUNCTION: Establishes array that stores values of results. */
        var newScore = {
            score: time,
            username: playerName,
        };

    /* FUNCTION: Adds score to the array. */
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

    /* FUNCTION: Moves user to the scores page. */
        window.location.href = 'scores.html';
    }
}

/* FUNCTION: Defines event for user to submit scores. */
function identifyEnter(event) {
    if (event.key == 'Click') {
        saveResults();
      }    
}

/* FUNCTION: Allows button to be clicked to start quiz. */
startBtn.onclick = beginQuiz
/* FUNCTION: Allows selecting an answer to move to next question/page. */
choicesEl.onclick = answerPressed
/* FUNCTION: Allows button submission of high score. */
submitBtn.onclick = saveResults
/* FUNCTION: Allows user to enter name.  */
playerNameEl.onkeyup = identifyEnter