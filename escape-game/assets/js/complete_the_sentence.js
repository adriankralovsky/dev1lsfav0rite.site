function showAnswers() {
    if (question == 1 && document.getElementById("motivation").innerHTML == "" ) {
        setTimeout(() => printStringByLetter("This is really easy.", document.getElementById("motivation")), 500);
    }
    setTimeout(() => document.getElementById(`sentence-${question + 1}`).style.display = "flex", 500);
    setTimeout(() => document.getElementById(`answers-${question + 1}`).style.display = "flex", 1000);
}

function hideText() {
    document.getElementById("div-text").style.display = "none"
    showAnswers()
}

var question = 0;
var sentences = [
    ["data", "tables", "databases"],
    ["function", "value", "called"],
    ["loop", "executed", "condition", "false"]
];
var answer = [];
var guessedAnswers = 0;

function startSentences() {
    document.getElementById("check-button").style.display = "flex"
    shuffleButtons();
    hideText();
    for (var i = 0; i < sentences[question].length; i++) {
        answer.push("");
        document.getElementById(sentences[question][i]).style.display = "flex";
    }
}


function correctAnswer() {
    document.getElementById(`sentence-${question + 1}`).style.display = "none";
    question++;
    answer = [];
    document.getElementById("game-over").style.display = "block";
    if (question < 3) {
        setTimeout(() => printStringByLetter("I guess that's correct. ", document.getElementById("game-over-text")), 300);
        setTimeout(() => printStringByLetter("Looks like you've got a handle on this.", document.getElementById("game-over-text")), 1800);
        setTimeout(() => document.getElementById("game-over-text").innerHTML = "", 4500)
        setTimeout(() => document.getElementById("game-over").style.display = "none", 4500)
        setTimeout(() => startSentences(), 4500);
    }
    else {
        document.getElementById("check-button").style.display = "none";
        setTimeout(() => printStringByLetter("You did it. ", document.getElementById("game-over-text")), 300);
        setTimeout(() => printStringByLetter("This wasn't as bad as I expected. ", document.getElementById("game-over-text")), 1400);
        setTimeout(() => printStringByLetter("Anyway, good luck, and may your words never fall out of order again!", document.getElementById("game-over-text")), 3200);
        setTimeout(() => document.getElementById("nextLevel").style.display = "flex", 7400)
    }
}

function wrongAnswer() {
    answer = [];
    document.getElementById("game-over").style.display = "block";
    document.getElementById(`sentence-${question + 1}`).style.display = "none";
    document.getElementById("sentence-1").innerHTML = '<span id="answer1-1"></span>is stored in<span id="answer1-2"></span>in<span id="answer1-3"></span>.';
    document.getElementById("sentence-2").innerHTML = '<span id="answer2-1"></span> returns a <span id="answer2-2"></span> when <span id="answer2-3"></span> .';
    document.getElementById("sentence-3").innerHTML = 'The <span id="answer3-1"></span> is <span id="answer3-2"></span> until the <span id="answer3-3"></span> is <span id="answer3-4"></span>.';
    document.getElementById(`answers-${question + 1}`).style.display = "none";
    setTimeout(() => printStringByLetter("This is unacceptable. ", document.getElementById("game-over-text")), 300);
    setTimeout(() => printStringByLetter("Try again, and don't let me down this time! ", document.getElementById("game-over-text")), 2000);
    setTimeout(() => document.getElementById("game-over-text").innerHTML = "", 5000)
    setTimeout(() => document.getElementById("game-over").style.display = "none", 5000)
    setTimeout(() => {for(var i = 0; i < sentences[question]; i++){document.getElementById[sentences[question][i]].remove}}, 5000)
    setTimeout(() => startSentences(), 5500);
}

function takeAGuess(event) {
    var allAnswers = answer.length;
    for (var i = 0; i < answer.length; i++) {
        if (answer[i] === '') {
            answer[i] = event.target.id;
            var guessedAnswer = i + 1
            break;
        }
    }

    for (var i = 0; i < answer.length; i++) {
        if (answer[i] === '') {
            allAnswers--;
            break
        }
    }

    event.target.style.display = "none";
    answerSpan = document.getElementById(`answer${question + 1}-${guessedAnswer}`);
    
    if (guessedAnswer - 1 == 0 && question !== 2) {
        var id = answer[0];
        var capId = id.charAt(0).toUpperCase() + id.slice(1);
        answerSpan.innerHTML = `<button id="${answer[guessedAnswer - 1]}">${capId}</button>`
    }
    else {
        answerSpan.innerHTML = `<button id="${answer[guessedAnswer - 1]}">${answer[guessedAnswer - 1]}</button>`
    }

    const newButton = answerSpan.querySelector("button");
    if (newButton) {
        newButton.addEventListener("click", returnButton);
    }
    checkCheckButton(allAnswers);
    updateSpanStyles();
}

function shuffleButtons() {
    const container = document.getElementById(`answers-${question + 1}`);
    const buttons = Array.from(container.children);

    for (let i = buttons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
    }

    buttons.forEach(button => container.appendChild(button));
}

function updateSpanStyles() {
    const spansWithId = document.querySelectorAll('.sentences span[id]');

    spansWithId.forEach(span => {
        if (span.textContent.trim() !== '') {
            span.style.borderStyle = 'none';
            span.style.margin = '0 12px';
            span.style.textDecoration = 'dotted';
            span.style.textDecorationLine = 'underline';
            span.style.minWidth = "0px";
        }
        else {
            span.style.borderStyle =  "solid";
            span.style.margin = "0 7px"; 
            span.style.textDecoration = "none";
            span.style.textDecorationLine = "none";
            span.style.minWidth = "70px";
        }
    });
}

function checkAnswers() {
    document.getElementById("check-button").disabled = true
    if (answer.every((value,index) => value === sentences[question][index])) {
        correctAnswer();
    }

    else {
        wrongAnswer();
    }
}

function returnButton(event) {
    const spanElement = event.target.closest('span');
    const buttonId = event.target.id
    event.target.remove();
        
    const id = spanElement.id; 
    const parts = id.split("-");

    const guessedAnswerId = parts[1];

    answer[guessedAnswerId - 1] = '';
    
    document.getElementById(buttonId).style.display = "flex";
    document.getElementById("check-button").disabled = true

    updateSpanStyles();

}

function checkCheckButton(number) {
    if (number === answer.length) {
        document.getElementById("check-button").disabled = false;
    }
    else {
        document.getElementById("check-button").disabled = true;
    }
}