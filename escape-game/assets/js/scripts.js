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

function setCookie(name, level) {
    var cookie = getCookie(name);
    if (level > cookie) {
        document.cookie = `level=${level}; path=/escape-game/`
    }
}

function checkCookie() {
    if (getCookie("level") == null)  {
        document.cookie = "level=1; path=/escape-game/"
    }
    else {
        checkLevel();
    }
}

function checkLevel() {
    var level = getCookie("level");
    for (var i = 1; i <= level; i++) {
        divLevel = document.getElementById(`level${i}`);
        try {
            divLevel.classList.remove("disabled");
            if (!divLevel.classList.contains("active")) {
                if (i != 5) {
                    divLevel.href = `../level${i}`;
                }
                else {
                    divLevel.href = "../end";
                }
            }
        }
        catch {
            continue;
        }
    }
}


function isPC() {
    const userAgent = navigator.userAgent.toLowerCase();
    return !/android|iphone|ipad|ipod|mobile|tablet/.test(userAgent);
}


function checkUserAgent() {
    const gameContent = document.getElementById("game-content");
    const deviceRestriction = document.getElementById("device-restriction");

    if (isPC()) {
        // Show the game content if the user is on a PC
        gameContent.style.display = "block";
        deviceRestriction.style.display = "none";
    } else {
        // Show the restriction message if the user is on a mobile or tablet
        gameContent.style.display = "none";
        deviceRestriction.style.display = "block";
    }
};