function showAnswers(question) {
    if (question == 2 && document.getElementById("motivation").innerHTML == "" ) {
        setTimeout(() => printStringByLetter("Negating statements is essential to understanding logic! Read carefully, and don't let me trick you with any assumptions!", document.getElementById("motivation")), 1000);
    }
    setTimeout(() => document.getElementById(`question-${question}`).style.display = "block", 1000);
    setTimeout(() => document.getElementById(`answer${question}-1`).style.display = "block", 1200);
    setTimeout(() => document.getElementById(`answer${question}-2`).style.display = "block", 1400);
    setTimeout(() => document.getElementById(`answer${question}-3`).style.display = "block", 1600);
    setTimeout(() => document.getElementById(`answer${question}-4`).style.display = "block", 1800);
    setTimeout(() => document.getElementById("bottom-answers").style.display = "block", 2000);
}

function hideText(question) {
    setTimeout(() => document.getElementById("div-text").style.display = "none", 500);
    setTimeout(() => showAnswers(question), 500);
}

var question = 0;
var answers = ["D", "B"]


function startNegationGame() {
    if (question == 0) {
        question++;
        hideText(question);
    }

    else {
        showAnswers(question);
    }   
}

function hideQuestion(question) {
    document.getElementById(`question-${question}`).style.display = "none";
    document.getElementById("bottom-answers").style.display = "none"
    document.getElementById(`answer${question}-1`).style.display = "none";
    document.getElementById(`answer${question}-2`).style.display = "none";
    document.getElementById(`answer${question}-3`).style.display = "none";
    document.getElementById(`answer${question}-4`).style.display = "none";
}

function correctAnswer() {
    question++;
    document.getElementById("game-over").style.display = "block";
    if (question < 3) {
        setTimeout(() => printStringByLetter("That's how I like it! ", document.getElementById("game-over-text")), 300);
        setTimeout(() => printStringByLetter("Just one more to pass the exam!", document.getElementById("game-over-text")), 1800);
        setTimeout(() => document.getElementById("game-over-text").innerHTML = "", 4500)
        setTimeout(() => document.getElementById("game-over").style.display = "none", 4500)
        setTimeout(() => startNegationGame(), 4500);    
    }
    else {
        setTimeout(() => printStringByLetter("Epic! ", document.getElementById("game-over-text")), 300);
        setTimeout(() => printStringByLetter("An overachiever like you is seen only once in a millennium! ", document.getElementById("game-over-text")), 1400);
        setTimeout(() => printStringByLetter("See you next week!", document.getElementById("game-over-text")), 4600);
        setTimeout(() => document.getElementById("nextLevel").style.display = "flex", 6100)
    }
}

function wrongAnswer() {
    question = 1;
    document.getElementById("game-over").style.display = "block";
    setTimeout(() => printStringByLetter("No! No! NO! ", document.getElementById("game-over-text")), 300);
    setTimeout(() => printStringByLetter("That's just plain wrong! ", document.getElementById("game-over-text")), 1800);
    setTimeout(() => printStringByLetter("Go again from the start!", document.getElementById("game-over-text")), 3200);
    setTimeout(() => document.getElementById("game-over-text").innerHTML = "", 5500)
    setTimeout(() => document.getElementById("game-over").style.display = "none", 5500)
    setTimeout(() => startNegationGame(), 5500);
}

function takeAGuess(event) {
    hideQuestion(question);
    
    if (event.target.textContent == answers[question - 1]) {
        correctAnswer();
    }
    else {
        wrongAnswer();
    }
}