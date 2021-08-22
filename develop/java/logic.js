

// var to ref dom elements

var questionEl = document.getElementById("questions");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initial");
var feedbackEl = document.getElementById("feedback");

// var to track
var currentQuestionsIndex = 0;
var time = questions.length * 15
var timerId;


// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
 // hide start screen
 var startScreenEl = document.getElementById("start-screen");
 startScreenEl.setAttribute("class","hide");

 // un-hide questions section
  questionsEl.removeAttribute("class");

 // start timer
 timerId= setInterval(clockTick, 1000);

 //show starting time
 timerEl.textContent = time;

  getQuestion();
}

function clockTick() {
    // update time
    time--; // time = time -1
    timerEl.textContent = time;
    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

function getQuestion() {
 // get current question object from array
 var currentQuestion = questions[currentQuestionIndex];

 // update title with current question

 var titleEl = document.getElementById("question-title");
 titleEl.textContent = cureentQuestion.title;

 // clear out my old question choices
 choicesEl.innerHTML = "";

 // loop over choices
 currentQuestion.choices.forEach(function(choice, i) {
     // create new button for each choice
     var choiceNode = document.createdElement("button");
     choiceNode.setAttribute("class", "choice");
     choiceNode.setAtrribute("value", choice);

     choiceNode.textContent = i + 1 + "." + choice;

     // attach click event listener to each choice
     choiceNode.onclick = questionClick;

     //display on the page
     choicesEl.appendChild(choiceNode);
 });




}

function questionClick() {
    // check if user guessed wrong
    if (this.value !== question[currentQuestionsindex].answer) {
        //penalize time
        time -= 15

        if(time,0) {
            time = 0;
        }
      // display new time
      timerEl.textContent = time;

      // play "wrong" sound effect
      sfxWrongh.play();

      feedbackEl.textContent = "Correct!";
    } else {
      // play "right" sound effect
      sfxRight.play();
      
      feedbackEl.textContent = "Correct!";
    }
   
    //flash right/wrong feedback on page for a half a secxond
    feedbackEl.setAttribute("class","feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class, feedback hide");
    }, 1000);

    // move to next question
    currentQuestionIndex++;

    // check if we've run out of question

    if (currentQuestionindex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    //show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAtrribute("class", "hide");
}

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !=="") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: inirials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscore", JSON.stringify(highscores));

        // redirect to next page
        window.locaction.href = "highscores.html";
    }
}


startBtn.addEventListener("click", function () {
 // hide the start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    // un-hide questions section
    questionsEl.removeAttribute("class");

    //start timer
    timerId = setInterval(clockTick, 1000);
    // show starting time
    timerEl.textContent = time;

    getQuestion();





})

startBtn.onclick = startQuiz();

submitBtn.onclick = saveHighscore;