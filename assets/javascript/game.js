// Trivia questions object

var gameQuestions = [{
    question: "In what year was Nintendo founded?",
    answerList: ["1929", "1962", "1889", "1901"],
    correctAnswer: 2,
},{
    question: "Who was the original founder of Nintendo?",
    answerList: ["Tatsumi Kimishima", "Shigeru Miyamoto", "Hideo Kojima", "Fusajiro Yamauchi"],
    correctAnswer: 3,
},{
    question: "What was Nintendo's initial product?",
    answerList: ["A playing card company", "A cab service", "A chain of love hotels", "A plumbing company"],
    correctAnswer: 0,
},{
    question: "Where is the headquarters of Nintendo based?",
    answerList: ["Tokyo, Japan", "Kyoto, Japan", "Osaka, Japan", "Yokohama, Japan"],
    correctAnswer: 1,
},{
    question: "Which of the following is NOT one of Nintendo's earlier business ventures?",
    answerList: ["A love hotel chain", "A taxi company", "A car company", "A food company"],
    correctAnswer: 2,
},{
    question: "When was Nintendo's first venture into the video game industry?",
    answerList: ["1974", "1965", "1981", "1970"],
    correctAnswer: 0,
},{
    question: "What was Nintendo's first handheld gaming system?",
    answerList: ["Game Boy", "Nintendo 64", "Game and Watch", "SNES"],
    correctAnswer: 2,
}, {
    question: "Which one of these consoles did Nintendo release in 2001?",
    answerList: ["Game Boy Advance SP", "Super Famicon Jr.", "Gamecube", "Wii"],
    correctAnswer: 2,
},{
    question: "What is the name for the design of Nintendo handhelds following the Game Boy Advance SP?",
    answerList: ["Lobster", "Clamshell", "Clamped", "Turtleshell"],
    correctAnswer: 1,
},{
    question: "What is the name of the mustachioed plumber hero in many of Nintendo's games? (Wears the red cap)",
    answerList: ["Marco", "Fontaine", "Luigi", "Mario"],
    correctAnswer: 3,
}];

// Game global variables

var currentQuestion;
var correct;
var incorrect;
var unanswered;
var answered;
var seconds;
var time;
var userSelected;
var messages = {
    rightAnswer: "Congrats that was the correct answer!",
    wrongAnswer: "Oops, looks like you got that one wrong!",
    endGame: "Let's see how much you know about Nintendo!",
    timeOut: "You ran out of time!",
};
var gifArray = [{
    giflink: "assets/images/marioearth.gif",
    alt: "Earth with Mario's face",
}]
$(document).ready(function(){
// Start Button Functionality

$("#startButton").on("click", function(){ 
    $(this).hide();
    newGame();
});




// Start game function

var newGame = function() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    currentQuestion = 0;
    answered = true;
    newQuestion();
};

// Timer function

var timer = function() {
    seconds = 15;
    $("#timer").text("Time Remaining: " + seconds)
    time = setInterval(countdown, 1000)
    answered = true;
};

var countdown = function() {
    seconds--;
    $("#timer").text("Time Remaining: " + seconds);
    if (seconds < 1){
        clearInterval(time)
        answered = false;
        solution();
    };
}

var newQuestion = function () {
    if (currentQuestion < 10) {
        $("#correctAnswer").empty();
        $("#message").empty();
        $("#userPick").empty();
        $("#currentQuestion").text("Current Question: " + (currentQuestion + 1));
        $(".question").text(gameQuestions[currentQuestion].question);
        for (var i = 0; i < gameQuestions[currentQuestion].answerList.length; i++) {
            var possibleChoices = $("<button>");
            possibleChoices.text(gameQuestions[currentQuestion].answerList[i])
            possibleChoices.attr({"data-index" : i});
            possibleChoices.addClass("choice btn btn-primary m-2 border border-dark rounded");
            $(".answerList").append(possibleChoices);
        };
        timer();

        $(".choice").on("click", function() {
            userSelected = $(this).data("index");
            answered = true;
            solution();
        });
    } else {
        resultsPage();
    };
    
};

var solution = function () {
    $("#timer").empty();
    $("#currentQuestion").empty();
    $(".question").empty();
    $(".answerList").empty();
    clearInterval(time);
    var correctAnswerIndex = gameQuestions[currentQuestion].correctAnswer
    console.log(correctAnswerIndex)
    $("#gifSpace").html("<img src=" + gifArray[currentQuestion].giflink + " alt=" + gifArray[currentQuestion].alt + ">")
    if (userSelected === correctAnswerIndex && answered === true) {
        $("#userPick").text("You selected " + gameQuestions[currentQuestion].answerList[userSelected]);
        $("#message").text(messages.rightAnswer);
        $("#correctAnswer").text("The correct answer was: " + gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].correctAnswer]);
        correct++
        currentQuestion++
        setTimeout(newQuestion, 5000);
    } else if (userSelected != correctAnswerIndex && answered === true) {
        $("#userPick").text("You selected " + gameQuestions[currentQuestion].answerList[userSelected]);
        $("#message").text(messages.wrongAnswer);
        $("#correctAnswer").text("The correct answer was: " + gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].correctAnswer]);
        incorrect++
        currentQuestion++
        setTimeout(newQuestion, 5000);
    } else {
        unanswered++;
        $("#message").text(messages.timeOut);
        $("#correctAnswer").text("The correct answer was: " + gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].correctAnswer])
        setTimeout(newQuestion, 5000);
        currentQuestion++;
    };

};

var resultsPage = function() {
    clearInterval(time);
    $("#userPick").empty();
    $("#message").empty();
    $("#correctAnswer").empty();
    $("#endGame").text(messages.endGame);
    $("#correct").text("You answered " + correct + " correct");
    $("#incorrect").text("You answered " + incorrect + " incorrect");
    $("#unanswered").text("You left " + unanswered + " unanswered");
    
// Build reset button   
    var resetButton = $("<button>");
    resetButton.addClass("btn btn-dark");
    resetButton.attr("id", "resetButton");
    resetButton.text("Restart");
    $("#button").append(resetButton);

    $("#resetButton").on("click", function(){ 
        $(this).hide();
        $("#endGame").empty();
        $("#correct").empty();
        $("#incorrect").empty();
        $("#unanswered").empty();
        $("#startButton").show();
    });
    
};


});