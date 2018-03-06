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
    lowerScore: "Looks like you should study more",
    middleScore: "You must be quite the Nintendo aficionado",
    topScore: "You're a true SuperStar!"
};
var gifArray = [{
        giflink: "assets/images/kid-tv.gif",
        alt: "Kid playing video games",
    },{
        giflink: "assets/images/starfox-flight.gif",
        alt: "Starfox footage"
    },{
        giflink: "assets/images/cardgames.gif",
        alt: "Pokemon cards"
    },{
        giflink: "assets/images/marioearth.gif",
        alt: "The earth with Mario"
    },{
        giflink: "assets/images/oldmario.gif",
        alt: "Three super mario games"
    },{
        giflink: "assets/images/electric-snes.gif",
        alt: "A lightning bolt across the SNES logo"
    },{
        giflink: "assets/images/gameandwatch.gif",
        alt: "A game and watch party"
    },{
        giflink: "assets/images/gamecube.gif",
        alt: "Gamecube starting screen"
    },{
        giflink: "assets/images/3ds.gif",
        alt: "Nintendo 3DS Console"
    },{
        giflink: "assets/images/breakdance-mario.gif",
        alt: "Mario breakdancing"
    },{
        giflink: "assets/images/loser.gif",
        alt: "A monkey lost in a sea of luigi"
    },{
        giflink: "assets/images/winner.gif",
        alt: "A badass Mario"
    },{
        giflink: "assets/images/top-score.gif",
        alt: "The Mario brothers dancing"
    }]
$(document).ready(function(){
// Start Button Functionality

$("#startButton").on("click", function(){ 
    $(this).hide();
    newGame();
});

// Reset Button Function
   
var resetButton = $("<button>");
resetButton.addClass("btn");
resetButton.css({"background-color": "red"})
resetButton.attr("id", "resetButton");
resetButton.text("Restart");
$("#button").append(resetButton);

$("#resetButton").on("click", function(){ 
    $(this).hide();
    $("#endGame").empty();
    $("#correct").empty();
    $("#incorrect").empty();
    $("#unanswered").empty();
    $("#gifSpace").empty();
    $("#score").empty();
    $("#startButton").show();
});

$(resetButton).hide();
// End Game function

var endgameScore = function(score) {
    if (score >= 9) {
        var gif = $("<img>")
        $(gif).attr({"src": gifArray[12].giflink, "alt": gifArray[12].alt });
        $(gif).css({"height": "300px", "width": "300px", "margin": "0 auto"});
        $("#gifSpace").html(gif);
        $("#score").text(messages.topScore);
    } else if (score >= 6) {
        var gif = $("<img>")
        $(gif).attr({"src": gifArray[11].giflink, "alt": gifArray[11].alt });
        $(gif).css({"height": "300px", "width": "300px", "margin": "0 auto"});
        $("#gifSpace").html(gif);
        $("#score").text(messages.middleScore);
    } else {
        var gif = $("<img>")
        $(gif).attr({"src": gifArray[10].giflink, "alt": gifArray[10].alt });
        $(gif).css({"height": "300px", "width": "300px", "margin": "0 auto"});
        $("#gifSpace").html(gif);
        $("#score").text(messages.lowerScore);
    }
};


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
    seconds = 10;
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
        $("#gifSpace").empty();
        $("#currentQuestion").text("Current Question: " + (currentQuestion + 1));
        $(".question").text(gameQuestions[currentQuestion].question);
        for (var i = 0; i < gameQuestions[currentQuestion].answerList.length; i++) {
            var possibleChoices = $("<button>");
            possibleChoices.text(gameQuestions[currentQuestion].answerList[i])
            possibleChoices.attr({"data-index" : i});
            possibleChoices.addClass("choice btn m-2 border border-dark rounded");
            possibleChoices.css({"background-color": "red"})
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
    var gif = $("<img>")
    $(gif).attr({"src": gifArray[currentQuestion].giflink, "alt": gifArray[currentQuestion].alt });
    $(gif).css({"height": "300px", "width": "300px", "margin": "0 auto"});
    $("#gifSpace").html(gif)
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
    $("#gifSpace").empty();
    $("#endGame").text(messages.endGame);
    $("#correct").text("You answered " + correct + " correct");
    $("#incorrect").text("You answered " + incorrect + " incorrect");
    $("#unanswered").text("You left " + unanswered + " unanswered");
    endgameScore(correct);
    $(resetButton).show();

    

    

};

    


});