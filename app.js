// pull in page objects
var highscoreDiv = document.querySelector("#highscore");
var gameTimerEl = document.querySelector("#gameTimer");
var quesTimerEl = document.querySelector("#quesTimer");
var mainEl = document.querySelector("#details");
var timerTab = document.querySelector("#timers");


// var questionEl = document.querySelector("#question")
// var answersListEl = document.querySelector("#answer-list")

// set global variables - how do we move these into localized
var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

var questionDuration = 15;
var questionSecElapsed = 0;
var questionInterval;

// draw instruction
init();

// var startButton = document.querySelector("#startQuiz");

// function to display instructions
function init() {
    clearDetails();
    reset();
    // creates Heading element for main page
    var heading = document.createElement("p");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "This game gives you the opportunity to take a time quiz!";

    // creates elements with the instructions for the game
    var instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = " You will have 15 seconds to answer each question. If you answer correctly you will score points. The quicker you answer the more points you will score. If you score incorrectly you will not lose points.";

    // adding more question - this should move into loop or function
    // creates button to start the game
    var startJsQuiz = document.createElement("button");
    startJsQuiz.setAttribute("id", "startJSQuiz");
    startJsQuiz.setAttribute("class", "btn btn-secondary");
    startJsQuiz.textContent = "Start Javascript Quiz";

    // creates button to start the game
    var startFoodQuiz = document.createElement("button");
    startFoodQuiz.setAttribute("id", "startFoodQuiz");
    startFoodQuiz.setAttribute("class", "btn btn-secondary");
    startFoodQuiz.textContent = "Start Food Quiz";
    startFoodQuiz.setAttribute("style", "display: none;");

    mainEl.appendChild(heading);
    mainEl.appendChild(instructions);
    mainEl.appendChild(startJsQuiz);
    mainEl.appendChild(startFoodQuiz);

    startJsQuiz.addEventListener("click", function() {
        quizType = "Java Script";
        playQuiz(jsQuestions);
    });

}

// function to clear details element of all children
function clearDetails() {
    mainEl.innerHTML = "";
}

function reset() {
    quizType = "";
    score = 0;

    gameDuration = 0;
    gameSecElapsed = 0;
    gameInterval;

    questionDuration = 15;
    questionSecElapsed = 0;
    questionInterval;
}

//start game
function playQuiz(questionSet) {
    if (test) { console.log("--- playQuiz ---"); }
    // select quiz randomize questions

    quiz = setUpQuestions(questionSet);

    // displays timers
    timerTab.setAttribute("style", "visibility: visible;");

    // Start timers here
    gameDuration = quiz.length * 15;
    if (test) { console.log("duration g,q:", gameDuration, questionDuration); }

    startGameTimer();
    renderTime();

    //go to first question
    presentQuestion();
}

// function to get random question out of array
function setUpQuestions(arr) {
    if (test) { console.log("--- setUpQuestions ---"); }

    var ranQuest = [];

    for (var i = 0; i < arr.length; i++) {
        ranQuest.push(arr[i]);
    }
    return ranQuest;
}

// function to redraw screen with  question 
function presentQuestion() {
    if (test) { console.log("--- presentQuestion ---"); }
    // if (test) {console.log("cur.choices[i] " + cur.choices);}

    //reset time allows to answer question
    questionSecElapsed = 0;

    // checks for no more questions and exits
    if (quiz.length === 0) {
        endOfGame();
        return;
    }

    // call question timer here
    // reduceQUiz global

    //sets current object (cur - question) by pulling out of reducedQuiz array leaving the remaining quetions in the array
    curQuestion = quiz.pop();

    //clears html to draw questions
    clearDetails();

    // add question to screen
    //build out display for new item
    var question = document.createElement("h1");
    // adds data value
    question.setAttribute("question", curQuestion.title);
    question.textContent = curQuestion.title;
    mainEl.appendChild(question)

    // create list as container to listen for answers
    var choiceBox = document.createElement("ul");
    choiceBox.setAttribute("id", "choiceBox");
    mainEl.appendChild(choiceBox);

    //adds answers to screen
    for (var i = 0; i < curQuestion.choices.length; i++) {
        // creates variable for each choice item
        var listChoice = document.createElement("li");
        // adds data value
        listChoice.setAttribute("choice-value", curQuestion.choices[i]);
        listChoice.setAttribute("id", "questionNum-" + i);
        listChoice.textContent = curQuestion.choices[i];
        //add choice to page
        choiceBox.appendChild(listChoice)
    }

    if (test) { console.log("cur", curQuestion); }

    choiceBox.addEventListener("click", function() {
        scoreAnswer(curQuestion);
    });
    // calls for the next questions
}

function scoreAnswer(cur) {
    if (test) { console.log("--- scoreAnswer ---"); }

    var e = event.target;
    if (e.matches("li")) {
        var selectedItem = e.textContent;
        // if (test) { console.log("check quiz " + quiz.length); }
        if (test) { console.log("selectedItem quiz " + selectedItem); }
        // if (test) { console.log("selectedItem cur " , cur.answer); }
        if (selectedItem === cur.answer) {
            // if (test) { console.log("correct answer");}
            score += 10;

        } else {
            if (test) { console.log("wrong answer"); }
            //penelty for being wrong
            gameDuration -= 10;
        }
        if (test) { console.log("selected ", selectedItem); }
        showAnswers(cur);
        // presentQuestion();
    }
}

// TODO incompvare does not disply the correct color!!!
function showAnswers(cur) {
    if (test) { console.log("--- showAnswer ---"); }
    // if (test) { console.log("sa length",cur.choices.length);}
    if (test) { console.log("sa qanda", cur); }
    if (test) { console.log("sselected ", selectedItem); }


    for (var i = 0; i < cur.choices.length; i++) {
        if (test) { console.log("sa in for ", i); }

        var questid = "#questionNum-" + i;
        // if (test) { console.log("sa qn", questid );}
        var questrow = document.querySelector(questid);

        // if (test) { console.log("questrow",questrow);}

        if (test) { console.log("saf selected" + selectedItem + "<"); }
        if (test) { console.log("saf color test >" + cur.choices[i] + "<"); }

        if (cur.choices[i] !== cur.answer) {
            if (test) { console.log("color test flase"); }
            questrow.setAttribute("style", "background-color: red");
        } else {
            if (test) { console.log("color test true"); }
            questrow.setAttribute("style", "background-color: green");
        }
    }
    // pause so user can see results
    setTimeout(presentQuestion, 500);
}

// function to set time for game timer
function setGameTime() {
    if (test) { console.log("--- setGameTime ---"); }
    if (test) { console.log("gameDuration " + gameDuration); }
    clearInterval(gameInterval);
    gameSeconds = gameDuration;
}


function renderTime() {
    // if (test) { console.log(" --- renderTime --- "); }
    // if (test) { console.log("gameSecElapsed " + gameSecElapsed); }
    // if (test) { console.log("gameDuration " + gameDuration); }
    // if (test) { console.log("questionDuration " + questionDuration); }

    gameTimerEl.textContent = gameDuration - gameSecElapsed;
    quesTimerEl.textContent = questionDuration - questionSecElapsed;

    if ((questionDuration - questionSecElapsed) < 1) {
        // game penelty for varting timer run out
        gameDuration -= 10;
        if (test) { console.log("too slow"); }
        presentQuestion();
    }

    if ((gameDuration - gameSecElapsed) < 1) {
        endOfGame();
    }
}

function startGameTimer() {
    if (test) { console.log("--- startGameTimer ---"); }
    setGameTime();

    gameInterval = setInterval(function() {
        gameSecElapsed++;
        questionSecElapsed++;
        renderTime();
    }, 1000);
}

function stopTime() {
    if (test) { console.log("--- stopTime --- "); }
    gameSeconds = 0;
    questionSeconds = 0;
    clearInterval(gameInterval);
}

// function of end of game
function endOfGame() {
    if (test) { console.log("--- endOfGame ---"); }
    stopTime();
    clearDetails();

    timerTab.setAttribute("style", "visibility: hidden;");

    var heading = document.createElement("p");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "Times Up! - I hope you have enjoyed this";

    // creates elements with the instructions for the game
    var instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = " Your score is " + score + " out of 100";

    // creates button to start the game
    var playAgain = document.createElement("button");
    playAgain.setAttribute("id", "playAgain");
    playAgain.setAttribute("class", "btn btn-secondary");
    playAgain.textContent = "Play again";
    playAgain.setAttribute("style", "display: visible;");

    // creates input for user to add initials
    // var par = document.createElement("p");

    // var initialsLabel = document.createElement("label");
    // initialsLabel.setAttribute("for", "userInitials");
    // initialsLabel.textContent = "Enter Initials: ";

    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("id", "userInitials");
    initialsInput.setAttribute("name", "userInitials");
    initialsInput.setAttribute("minlength", "3");
    initialsInput.setAttribute("maxlength", "3");
    initialsInput.setAttribute("size", "3");


    mainEl.appendChild(heading);
    mainEl.appendChild(instructions);
    mainEl.appendChild(initialsLabel);
    mainEl.appendChild(initialsInput);
    mainEl.appendChild(par);
    mainEl.appendChild(playAgain);

    playAgain.addEventListener("click", init);

    initialsInput.addEventListener("input", function() {
        initialsInput.value = initialsInput.value.toUpperCase();
        if (initialsInput.value.length === 3) {

            //create object for this score
            var thisScore = [{ type: quizType, name: initialsInput.value, score: score }];

            //get highscores from memory
            var storedScores = JSON.parse(localStorage.getItem("highScores"));
            if (test) { console.log("storedScore", storedScores); }

            if (storedScores !== null) {
                storedScores.push(thisScore[0]);
            } else {
                storedScores = thisScore;
            }

            localStorage.setItem("highScores", JSON.stringify(storedScores));
            highScores();
        }
    });
}

// function highScores() {
//     stopTime();
//     clearDetails();

//     timerTab.setAttribute("style", "visibility: hidden;");

//     //get scores from storage
//     var storedScores = JSON.parse(localStorage.getItem("highScores"));

//     // draw heading
//     var heading = document.createElement("h2");
//     heading.setAttribute("id", "main-heading");
//     heading.textContent = "High Scores";

//     mainEl.appendChild(heading);

//     // Render a new li for each score
//     // TODO check for this error 
//     if (storedScores !== null) {
//         // sort scores
//         storedScores.sort((a, b) => (a.score < b.score) ? 1 : -1);

//         // sets the number of scores to display to 5 or the number of games played. Which ever is less
//         var numScores2Display = 5;
//         if (storedScores.length < 5) {
//             numScores2Display = storedScores.length;
//         }

//         for (var i = 0; i < numScores2Display; i++) {
//             var s = storedScores[i];

//             var p = document.createElement("p");
//             p.textContent = s.name + " " + s.score + " ( " + s.type + " )";
//             mainEl.appendChild(p);
//         }
//     } else {
//         var p = document.createElement("p");
//         p.textContent = "Your Initials Here!"
//         mainEl.appendChild(p);
//     }


//     // creates button to start the game
//     var playAgain = document.createElement("button");
//     playAgain.setAttribute("id", "playAgain");
//     playAgain.setAttribute("class", "btn btn-secondary");
//     playAgain.textContent = "Play!";

//     mainEl.appendChild(playAgain);

//     playAgain.addEventListener("click", init);
// }

// highscoreDiv.addEventListener("click", highScores);