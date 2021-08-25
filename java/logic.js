// var to ref dom elements

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initial");
var feedbackEl = document.getElementById("feedback");

// var to track
var currentQuestionIndex = 0;
var time = questions.length * 15
var timerId;


// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
console.log(Audio);

//startBtn.onclick = startQuiz();
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

  getQuestions();
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

function getQuestions() {
 // get current question object from array
 var currentQuestion = questions[currentQuestionIndex];

 // update title with current question

 var titleEl = document.getElementById("question-title");
 titleEl.textContent = currentQuestion.title;

 // clear out my old question choices
 choicesEl.innerHTML = "";

 // loop over choices
 currentQuestion.choices.forEach(function(choice, i) {
     
  
   console.log(currentQuestion);
    // create new button for each choice
     var choicesNode = document.createElement("button");
     choicesNode.setAttribute("class", "choice");
     choicesNode.setAttribute("value", choice);
      console.log(choice);
     choicesNode.textContent = i + 1 + "." + choice;

     // attach click event listener to each choice
     choicesNode.onclick = questionClick;

     //display on the page
     choicesEl.appendChild(choicesNode);
 });




}

function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        //penalize time
        time -= 15

        if (time < 0) {
            time = 0;
        }
      // display new time
      timerEl.textContent = time;

      // play "wrong" sound effect
      sfxWrong.play();

      feedbackEl.textContent = "Correct!";
    } else {
      // play "right" sound effect
      sfxRight.play();
      
      feedbackEl.textContent = "Incorrect!";
    }
   
    //flash right/wrong feedback on page for a half a secxond
    feedbackEl.setAttribute("class","feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback, hide");
    }, 1000);
console.log(feedback);
    // move to next question
    currentQuestionIndex++;

    // check if we've run out of question

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestions();
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
    questionsEl.setAttribute("class", "hide");
}

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
 console.log(value);
    // make sure value wasn't empty
    if (initials !=="") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscore", JSON.stringify(highscores));

        // redirect to next page
        window.locaction.href = "highscores.html";
    }
}

function checkForEnter(event) {
    // "13" reresents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}
submitBtn.onclick = saveHighscore;

startBtn.addEventListener("click", function () {
 // hide the start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class","hide");

    // un-hide questions section
    questionsEl.removeAttribute("class");

    //start timer
    timerId = setInterval(clockTick, 1000);
    // show starting time
    timerEl.textContent = time;

    getQuestions();


 

})


