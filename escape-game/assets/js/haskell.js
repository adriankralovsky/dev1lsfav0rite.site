function showAnswers() {
    if (question == 2 && document.getElementById("motivation").innerHTML == "" ) {
        setTimeout(() => printStringByLetter("Functional programming is not just about writing code - it's about thinking like the computer. If you can understand how Haskell evaluates this, you may just pass.", document.getElementById("motivation")), 1000);
    }
    document.getElementById("codeblock").style.display = "flex";
    setTimeout(() => document.getElementById(`code${question}`).style.display = "flex", 1000);
    setTimeout(() => document.getElementById(`answers-${question}`).style.display = "flex", 1500);
}

function hideText() {
    setTimeout(() => document.getElementById("div-text").style.display = "none", 500);
    setTimeout(() => showAnswers(), 500);
}

var question = 0;
var answers = ["A", "A", "D"]


function beginHaskell() {
    if (question == 0) {
        question++;
        hideText();
    }

    else {
        showAnswers();
    }
}

function hideQuestion() {
    document.getElementById("codeblock").style.display = "none";
    document.getElementById(`code${question}`).style.display = "none";
    document.getElementById(`answers-${question}`).style.display = "none";
}

function correctAnswer() {
    question++;
    document.getElementById("game-over").style.display = "block";
    if (question < 4) {
        setTimeout(() => printStringByLetter("You're a natural! ", document.getElementById("game-over-text")), 300);
        setTimeout(() => printStringByLetter("Only few steps toward enlightenment.", document.getElementById("game-over-text")), 1800);
        setTimeout(() => document.getElementById("game-over-text").innerHTML = "", 4500)
        setTimeout(() => document.getElementById("game-over").style.display = "none", 4500)
        setTimeout(() => beginHaskell(), 4500);    
    }
    else {
        setTimeout(() => printStringByLetter("Impressive. ", document.getElementById("game-over-text")), 300);
        setTimeout(() => printStringByLetter("You've passed Haskell and proven your worth as a functional programmer. ", document.getElementById("game-over-text")), 1400);
        setTimeout(() => printStringByLetter("Now, continue onward - but beware, greater challenges lie ahead.", document.getElementById("game-over-text")), 6000);
        setTimeout(() => document.getElementById("nextLevel").style.display = "flex", 10000)
    }
}

function wrongAnswer() {
    document.getElementById("game-over").style.display = "block";
    setTimeout(() => printStringByLetter("Tsk, tsk. ", document.getElementById("game-over-text")), 300);
    setTimeout(() => printStringByLetter("Haskell will not forgive such mistakes. ", document.getElementById("game-over-text")), 1500);
    setTimeout(() => printStringByLetter("Retry.", document.getElementById("game-over-text")), 4200);
    setTimeout(() => document.getElementById("game-over-text").innerHTML = "", 5500)
    setTimeout(() => document.getElementById("game-over").style.display = "none", 5500)
    setTimeout(() => beginHaskell(), 5500);
}

function takeAGuess(event) {
    hideQuestion(question);
    
    if (event.target.id == answers[question - 1]) {
        correctAnswer();
    }
    else {
        wrongAnswer();
    }
}