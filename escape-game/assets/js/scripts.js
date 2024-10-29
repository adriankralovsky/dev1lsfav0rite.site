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
        divLevel.classList.remove("disabled");
        if (!divLevel.classList.contains("active")){
            divLevel.href = `../level${i}`;
        }
    }
}