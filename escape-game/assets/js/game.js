function printStringByLetter(myString, myDiv) {
    var index = 0;
    var intervalId = setInterval(function() {
        myDiv.innerHTML += myString.charAt(index);
        index++;
        if(index == myString.length) {
            clearInterval(intervalId);
        }
    }, 50);
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null; 
}

function checkLevel() {
    var level = getCookie("level");
    for (var i = 1; i <= level; i++) {
        divLevel = document.getElementById(`level${i}`);
        divLevel.classList.remove("disabled");
        if (!divLevel.classList.contains("active")){
            divLevel.href = `../level${i}`;
        }
    }
}

function showHangman() {
    // Show game
    document.getElementById("hangman-game").style.display = "block";
    
    // Show letter buttons
    document.getElementById("hangman-letters").style.display = "flex";
}

function hideHangman() {
    // Hide game
    document.getElementById("hangman-game").style.display = "none";
    
    // Hide letter buttons
    document.getElementById("hangman-letters").style.display = "none";

    // Show "Game Over" text
    document.getElementById("game-over").style.display = "block";
}

function resetFields() {
    let buttons = document.querySelectorAll("[id='letter']");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    };
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
    hangmanGame(null);
}

function restartButton() {
    document.getElementById("restart").style.display = "flex";
}

function gameOver() {
    hideHangman();
    setTimeout(() => printStringByLetter("Oh no! ", document.getElementById("game-over-text")), 500);
    setTimeout(() => printStringByLetter("You've failed your very first task! ", document.getElementById("game-over-text")), 1500);
    setTimeout(() => printStringByLetter("This semester will be very difficult for you...", document.getElementById("game-over-text")), 3500); 
    setTimeout(() => restartButton(), 7000);
}

function congratulations() {
    if (guessed_num < 3) {
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
            if (guessed_num == 1) {
                printStringByLetter("Every correct guess brings you closer to freedom!", document.getElementById("motivation"));
            }
        }
        else {
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