var mysteryWords = ["eleven", "mouthbreather", "demogorgon", "eggo", "hawkins", "hopper"];

var guessesRemaining;
var alphabet;
var userGuesses;
var userGuessWrong;
var correctGuesses;
var blanks;
var guessIndices;
var chosenWord;
var wordLength;
var winCount = 0;
var randomNum;

function reset() {
    guessesRemaining = 10;
    alphabet = "abcdefghijklmnopqrstuvwxyz";
    userGuesses = [];
    userGuessWrong = [];
    correctGuesses = [];
    blanks = [];
    guessIndices = [];
    //chooses a random word
    chosenWord = mysteryWords[Math.floor(Math.random() * mysteryWords.length)];
    wordLength = chosenWord.length;
    document.getElementById("tries").textContent=guessesRemaining;
    document.getElementById("guesses").textContent=userGuessWrong;
    //display what the player needs to guess
        for (var i = 0; i < wordLength; i++) {
            blanks[i] = "_";
        }
        document.getElementById("word").textContent=blanks.join("");
}

reset();

var imageArrayWinner = [
    "assets/images/win/bitchin.gif",
    "assets/images/win/cheer.gif",
    "assets/images/win/goodjob.gif",
    "assets/images/win/nerd.gif",
    "assets/images/win/good.gif"
];

function winImage() {
    randomNum = Math.floor(Math.random()*imageArrayWinner.length);
    document.getElementById("main-image").src = imageArrayWinner[randomNum];
}

var imageArrayLoser = [
    "assets/images/lose/bad.gif",
    "assets/images/lose/choke.gif",
    "assets/images/lose/danger.gif",
    "assets/images/lose/dont.gif",
    "assets/images/lose/wasting_time.gif"
];

function loseImage() {
    randomNum = Math.floor(Math.random()*imageArrayLoser.length);
    document.getElementById("main-image").src = imageArrayLoser[randomNum];
}

     //when user presses a key
        document.onkeyup = function(event1) {
            document.getElementById("main-image").src = "assets/images/stranger-words.png";
            var userGuess = event1.key.toLowerCase();
            //check if guess is an alphabet character
            var checkGuess = alphabet.indexOf(userGuess);
            //prevent the guessed letter from re-triggering event again
            alphabet = alphabet.replace(userGuess, "");
                //if guess is valid character and if there are tries remaining, check if guessed letter is in the word
                if (checkGuess >=0 && guessesRemaining > 0) {
                    var guess = chosenWord.indexOf(userGuess);
                    //if guessed letter is in the word, then fill in the appropriate blanks
                    if (guess >= 0) {
                        for (var j = 0; j < wordLength; j++) {
                            if (chosenWord[j] === userGuess) {
                                guessIndices.push(j);
                            }
                        }
                        for (var k = 0; k < guessIndices.length; k++) {
                             blanks[guessIndices[k]] = userGuess;
                             console.log(blanks);
                        }
                        document.getElementById("word").textContent=blanks.join("");
                        guessIndices = [];
                        //if word is completed, YOU WIN! :) if no tries left, YOU LOSE! :(
                        if (blanks.indexOf("_") < 0 ) {
                            winCount++;
                            document.getElementById("score-wins").textContent=winCount;
                            document.getElementById("word").textContent=blanks.join("");
                            alert("YOU WIN!");
                            reset();
                            winImage();
    //TO FIX: WORD SHOULD SHOW LAST LETTER BEFORE RESET...
                        } else if (guessesRemaining <= 0) {
                            alert("You Lose!");
                            reset();
                            loseImage();
                        }
                    //if guessed letter is NOT in the word, then reduce tries by one and add letter to list of incorrect guesses
                    } else {
                        guessesRemaining--;
                        userGuessWrong.push(userGuess);
                        document.getElementById("tries").textContent=guessesRemaining;
                        document.getElementById("guesses").textContent=userGuessWrong;
                        //if no tries left, YOU LOSE!
                        if (guessesRemaining <= 0) {              
                            alert("You Lose!");
                            reset();
                            loseImage();          
                        }
                    }
                }
            }
    
