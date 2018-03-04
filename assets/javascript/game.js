// Trivia questions object array


var q1 = [{
        a1: {
            answer: "This is the correct answer",
            value: true,
        },
        a2: {
            answer: "This is the second answer",
            value: false,
        },
        a3: {
            answer: "This is the third answer",
            value: false,
        },
        a4: {
            answer: "This is the last answer",
            value: false,
        }
    }];
var q2 = [{
        a1: {
            answer: "This is the correct answer2",
            value: true,
        },
        a2: {
            answer: "This is the second answer",
            value: false,
        },
        a3: {
            answer: "This is the third answer",
            value: false,
        },
        a4: {
            answer: "This is the last answer",
            value: false,
        }
    }];
var q3 = [{
        a1: {
            answer: "This is the correct answer3",
            value: true,
        },
        a2: {
            answer: "This is the second answer",
            value: false,
        },
        a3: {
            answer: "This is the third answer",
            value: false,
        },
        a4: {
            answer: "This is the last answer",
            value: false,
        }
    }];
var q4 = [{
        a1: {
            answer: "This is the correct answer4",
            value: true,
        },
        a2: {
            answer: "This is the second answer",
            value: false,
        },
        a3: {
            answer: "This is the third answer",
            value: false,
        },
        a4: {
            answer: "This is the last answer",
            value: false,
        }
    }];
var questions = [q1, q2, q3, q4]
var questionsPrompted = []

// Function that determines the question that appears

var questionFunc = function () {
    var selectedQuestion = questions[Math.floor(Math.random() * questions.length)]
    if (questionsPrompted.indexOf(selectedQuestion) < 0) {
        questionsPrompted.push(selectedQuestion);
        console.log(questionsPrompted)
    }

}

// Function that displays the array in the game id 

