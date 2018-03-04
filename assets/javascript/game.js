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
$(document).ready(function(){
// Start Button Functionality

$("#startButton").on("click", function(){ 
    $(this).hide();
    newGame();
});

// Reset game button function for the final screen

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
    seconds = 30;
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
    };
}

var newQuestion = function () {
    $("#correctAnswer").empty();
    $("#message").empty();
    $("#currentQuestion").text("Current Question: " + (currentQuestion + 1));
    $(".question").text(gameQuestions[currentQuestion].question);
    for (var i = 0; i < gameQuestions[currentQuestion].answerList.length; i++) {
        var possibleChoices = $("<div>");
        possibleChoices.text(gameQuestions[currentQuestion].answerList[i])
        possibleChoices.attr({"data-index" : i});
        possibleChoices.addClass("choice");
        $(".answerList").append(possibleChoices);
    };
    timer();

    $(".choice").on("click", function() {
        userSelected = $(this).data("index");
        answered = true;
        solution();
    });
};

var solution = function () {
    $("#timer").empty();
    $("#currentQuestion").empty();
    $(".question").empty();
    $(".answerList").empty();
    clearInterval(time);
    $("#userPick").text("You selected " + gameQuestions[currentQuestion].answerList[userSelected])
    var correctText = (gameQuestions[currentQuestion].question)
    var correctAnswerIndex = (gameQuestions[currentQuestion].answer)

    if (userSelected === correctAnswerIndex && answered === true) {
        $("#message").text(messages.rightAnswer);
        $("#correctAnswer").text("The correct answer was: " + gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].correctAnswer]);
        correct++
        currentQuestion++
        setTimeout(newQuestion, 10000);
    } else if (userSelected != correctAnswerIndex && answered === true) {
        $("#message").text(messages.wrongAnswer);
        $("#correctAnswer").text("The correct answer was: " + gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].correctAnswer]);
        incorrect++
        currentQuestion++
        setTimeout(newQuestion, 10000);
    } else {
        unanswered++;
        $("#message").text(messages.timeOut);
        $("#correctAnswer").text("The correct answer was: " + gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].correctAnswer])
        setTimeout(newQuestion, 10000);
    };
}


});