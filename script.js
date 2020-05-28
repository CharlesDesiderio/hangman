let phrase = "Show And Tell";

let blocks = phrase.toUpperCase().split(" ")

let guesses = [];

let matches = [];

let lives = 5;

for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length; j++) {
        document.getElementById("board").innerHTML += `<span class="${blocks[i].charAt(j)}">X</span>`
    }
    document.getElementById("board").innerHTML += " ";
}

let checkForMatches = (thisVal) => {
    let thisLetter = false;
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            if (thisVal.toUpperCase() === blocks[i].charAt(j)) {
                thisLetter = true;
                matches = [...matches, thisVal]
            }
        }
    }

    if (thisLetter) {
        let myClasses = document.querySelectorAll(`.${thisVal.toUpperCase()}`);
        for (let i = 0; i< myClasses.length; i++) {
            myClasses[i].innerHTML = thisVal;
        }
    }

    if (!thisLetter) {
        lives--
        document.querySelector(".lives").innerHTML = lives;
    }

    if (!lives) {
        document.querySelector("#guess").disabled = true;
        document.querySelector("#guess").placeholder = "GAME OVER - LOSE";        
    }

    if (phrase.split(" ").join("").length === matches.join("").length) {
        document.querySelector("#guess").disabled = true;
        document.querySelector("#guess").placeholder = "GAME OVER - WIN";
    }
}

let changeField = () => {
    let thisVal = document.querySelector("#guess").value
    let exists = false;
    guesses.forEach((x) => {
        if (x.match(thisVal)) {
            exists = true;
        }
    })
    if (!exists) {
        guesses = [...guesses, thisVal]
        document.querySelector(".lastGuess").innerHTML = thisVal
        checkForMatches(thisVal)
    }

    document.querySelector(".allGuesses").innerHTML = guesses
    document.querySelector("#guess").value = "";
}

document.querySelector("#guess").addEventListener('keyup', changeField);


