function showHangman() {
    document.getElementById("hangman-game").style.display = "block";
    document.getElementById("hangman-letters").style.display = "flex";
}

function hideHangman() {
    document.getElementById("hangman-game").style.display = "none";
    document.getElementById("hangman-letters").style.display = "none";
    document.getElementById("game-over").style.display = "block";
}

function resetFields() {
    let buttons = document.querySelectorAll("[id='letter']");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    };
    document.getElementById("game-over-text1").innerHTML = "";
    document.getElementById("game-over-text2").innerHTML = "";
    document.getElementById("game-over-text3").innerHTML = "";
    document.getElementById("game-over-text4").innerHTML = "";
    document.getElementById("game-over-text5").innerHTML = "";
    document.getElementById("game-over-text6").innerHTML = "";
    document.getElementById("game-over-text7").innerHTML = "";
    document.getElementById("game-over-text8").innerHTML = "";
    document.getElementById("game-over-text9").innerHTML = "";
    document.getElementById("game-over-text").innerHTML = "";
    document.getElementById("command").innerHTML = "~$ ";
    document.getElementById("congrats").innerHTML = "";
    
    document.getElementById("restart").style.display = "none";
}


function restartGame() {
    init = true;
    guessed = false;
    strikes = 0;
    guess = [];
    resetFields();
    setTimeout(() => hangmanGame(null), 500);
}

function restartButton() {
    document.getElementById("restart").style.display = "flex";
}

function gameOver() {
    hideHangman();
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text1")), 500);
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text2")), 1000);
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text3")), 1500);
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text4")), 2000);
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text5")), 2500);
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text6")), 3000);
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text7")), 3500);
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text8")), 4000);
    setTimeout(() => printStringByLetter("ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!ERROR!", document.getElementById("game-over-text9")), 4500);
    setTimeout(() => printStringByLetter("Oh no! ", document.getElementById("game-over-text")), 7500);
    setTimeout(() => printStringByLetter("You've failed your very first task! ", document.getElementById("game-over-text")), 8500);
    setTimeout(() => printStringByLetter("This semester will be very difficult for you...", document.getElementById("game-over-text")), 11000); 
    setTimeout(() => restartButton(), 14000);
}

function congratulations() {
    if (guessed_num < 3) {
        strikes = 0;
        document.getElementById("hangman-letters").style.display = "none";
        setTimeout(() => printStringByLetter("Congratulations! ", document.getElementById("congrats")), 500);
        setTimeout(() => printStringByLetter("You're doing well!", document.getElementById("congrats")), 1500);
        setTimeout(() => hangmanGame(null), 3500);
    }
    else {
        hideHangman();
        setTimeout(() => printStringByLetter("Terrific! ", document.getElementById("game-over-text")), 500);
        setTimeout(() => printStringByLetter("You're exactly the student we've been searching for! ", document.getElementById("game-over-text")), 1500);
        setTimeout(() => printStringByLetter("Lesson's over. See you next week! ", document.getElementById("game-over-text")), 5000);
        setTimeout(() => document.getElementById("nextLevel").style.display = "flex", 7000);
    }
}

var words = ['ITERATION','VARIABLE','INTEGER'];
var guess = [];
var remove = ['sudo ', 'rm ', '-rf ', '/']
var guessed_num = 0;
var init = true;
var guessed = false;
var strikes = 0;

function hangmanGame(letter) {
    if (guessed_num <= 3) {
        var word = words[guessed_num];
        var guessed = false;
        if (init) {
            resetFields();
            showHangman();
            for (var i = 0; i < word.length; i++) {
                guess[i] = "_";
            }
            init = false;
            if (guessed_num == 1 && document.getElementById("motivation").innerHTML == "" ) {
                printStringByLetter("Every correct guess brings you closer to freedom!", document.getElementById("motivation"));
            }
        }
        else {
            document.getElementById("hangman-letters").style.display = "flex";
            var wasLetter = false;
            for (var i = 0; i < word.length; i++) {
                if (word[i] == letter) {
                    guess[i] = letter;
                    wasLetter = true;
                }
            }
            if (!wasLetter) {
                strikes++;
                if (strikes >= 5) {
                    gameOver();
                }
                else {
                    printStringByLetter(remove[strikes - 1], document.getElementById("command"));
                }
            }
            else {
                guessed = true;

                for (var i = 0; i < word.length; i++) {
                    if (guess[i] == "_") {
                        guessed = false
                    }
                };
                if (guessed) {
                    guess = [];
                    init = true;
                    guessed_num++;
                    congratulations();
                }
            }
        }
        document.getElementById("guessed-word").innerHTML = guess.join(" ");
    }
    
    else {
        hideHangman();
    }
}

function guessLetter(event) {
    event.target.disabled = true;
    hangmanGame(event.target.textContent);
}