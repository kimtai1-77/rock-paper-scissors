

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const rounds = params.get("rounds");
let currentRound = parseInt(params.get("current"));

window.addEventListener("DOMContentLoaded", () => {

    // Reference modal and elements
    const switchModal = document.getElementById("switchMode");
    const switchMessage = document.getElementById("switchMessage");
    const confirmBtn = document.getElementById("confirmSwitch");
    const cancelBtn = document.getElementById("cancelSwitch");
    const switchButton = document.querySelector('[data-set="switch"]'); // your trigger button
    const startOver = document.querySelector('[data-set="start-over"]');

    // when the start over btn is clicked
    startOver.addEventListener("click", () => {
        // reset stored scores
        sessionStorage.clear();

        // redirect to index.html
        window.location.href = "../index.html";
    });

    // When the switch button is clicked, open the modal
    switchButton.addEventListener("click", () => {

        // Set the message depending on mode
        if (mode === "multi") {
            switchMessage.textContent = "Switch to single player?";
        } else {
            switchMessage.textContent = "Switch to multi player?";
        }

        // Show the modal
        switchModal.style.display = "block";
    });

    // Handle "Yes" button
    confirmBtn.addEventListener("click", () => {

        // reset scores as well as round processed flag
        sessionStorage.removeItem("player1Wins");
        sessionStorage.removeItem("player2Wins");
        sessionStorage.removeItem("computerWins");
        sessionStorage.removeItem("ties");
        sessionStorage.removeItem("roundProcessed");
        sessionStorage.removeItem("lastResult");


        // Flip the mode
        if (mode === "multi") {
            //sessionStorage.setItem("mode", "single");
            // Redirect to single player start page
            window.location.href = "./player-enter-name.html";
        } else {
            //sessionStorage.setItem("mode", "multi");
            // Redirect to multiplayer start page
            window.location.href = "./2-player-start.html";
        }
    });

    // Handle "Cancel" button
    cancelBtn.addEventListener("click", () => {
        // Hide the modal again
        switchModal.style.display = "none";
    });
});



window.addEventListener("DOMContentLoaded", () => {
// 1. Read choices from the URL
const player1Name = params.get("player1");
const player2Name = params.get("player2");
const player1Choice = params.get("player1Choice");
const player2Choice = params.get("player2Choice"); 
const compChoice = params.get("compChoice");

// 2. Read scores from sessionStorage (or start at 0)
let player1Wins = parseInt(sessionStorage.getItem("player1Wins")) || 0;   
let player2Wins = parseInt(sessionStorage.getItem("player2Wins")) || 0;     
let computerWins = parseInt(sessionStorage.getItem("computerWins")) || 0;
let ties = parseInt(sessionStorage.getItem("ties")) || 0;

// 3. Run one round using functions from script.js
    // first, check if round has already been processed
const roundProcessed = sessionStorage.getItem("roundProcessed");

let result; 
if (!roundProcessed) {
    if (mode === "multi") { 
        result = getWinner(player1Choice, player2Choice); 
        if (result === "player1") {
            player1Wins++; 
            sessionStorage.setItem("player1Wins", player1Wins);
        } else if (result === "player2") { 
            player2Wins++; 
            sessionStorage.setItem("player2Wins", player2Wins);
        } else { 
            ties++; 
            sessionStorage.setItem("ties", ties); 
        } 
    sessionStorage.setItem("roundProcessed", "true");
    } else { 
        result = getWinner(player1Choice, compChoice); 
        if (result === "player1") { 
            player1Wins++; 
            sessionStorage.setItem("player1Wins", player1Wins); 
        } else if (result === "player2") { 
            computerWins++;
            sessionStorage.setItem("computerWins", computerWins); 
        } else { 
            ties++;
            sessionStorage.setItem("ties", ties);
        }
    sessionStorage.setItem("roundProcessed", "true");
    }
} else {
    // if round processed, read last result
    result = sessionStorage.getItem("lastResult");
}
// store last result
sessionStorage.setItem("lastResult", result);

// 4. Update the DOM
if (mode === "multi") {
    document.querySelector("#player-choice").textContent = `${player1Name} chose: ${player1Choice}`;
    document.querySelector("#computer-choice").textContent = `${player2Name} chose: ${player2Choice}`;
    
    //show round result
    document.querySelector("#roundResult").innerHTML =
    result === "player1" 
        ? `<img src="../images/winning cat emoji.png" class="emoji-character animate" alt="Mascot"> ${player1Name} wins this round!`
        : result === "player2" 
        ? `<img src="../images/winning cat emoji.png" class="emoji-character animate" alt="Mascot"> ${player2Name} wins this round!`
    : `😤 It's a tie!`;


    //show scores 
    const labelsMulti = [player1Name, player2Name, "Ties"];
    const maxLengthMulti = Math.max(...labelsMulti.map(l => l.length));
    
    const p1Line = labelsMulti[0].padEnd(maxLengthMulti, " ") + ": " + player1Wins;
    const p2Line = labelsMulti[1].padEnd(maxLengthMulti, " ") + ": " + player2Wins;
    const tiesLine = labelsMulti[2].padEnd(maxLengthMulti, " ") + ": " + ties;

    document.querySelector("#scoreboard-body").textContent =
    p1Line + "\n" +
    p2Line + "\n\n" +
    tiesLine;

} else {
    //show choices
    document.querySelector("#player-choice").textContent = "You chose: " + player1Choice;
    document.querySelector("#computer-choice").textContent = "Computer chose: " + compChoice;

    //show round result
    document.querySelector("#roundResult").innerHTML =
        result === "player1" ? `<img src="../images/winning cat emoji.png" class="emoji-character animate" alt="Mascot"> You win this round!` :
        result === "player2" ? "Computer wins this round!" :
        "It's a tie!";

    // show scores (single mode)
    const labelsSingle = ["You", "Computer", "Ties"];
    const maxLengthSingle = Math.max(...labelsSingle.map(l => l.length));
    
    const youLine = labelsSingle[0].padEnd(maxLengthSingle, " ") + ": " + player1Wins;
    const compLine = labelsSingle[1].padEnd(maxLengthSingle, " ") + ": " + computerWins;
    const tiesLine = labelsSingle[2].padEnd(maxLengthSingle, " ") + ": " + ties;

    document.querySelector("#scoreboard-body").textContent =
        youLine + "\n" +
        compLine + "\n\n" +
        tiesLine;
}

// 5. Wire up Play Again button
const playAgainBtn = document.querySelector("#play-again");

if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
        // reset the flag so the next round can run
        sessionStorage.removeItem("roundProcessed");

        if (mode === "multi") {
            if (rounds === "3" || rounds === "5" || rounds === "7") {
                currentRound++;

                // if there are remaining rounds, go to round counter
                if (currentRound <= parseInt(rounds)) {
                    params.set("current", currentRound);
                    window.location.href = "./round-counter.html?" + params.toString();
                } else {

                    // all rounds played - go to results
                    window.location.href = "./results.html?" + params.toString();
                }

                // retain normal flow
            } else if (rounds === "unlimited") {
                window.location.href = "./player-1-selection.html?" + params.toString();
            }
            // back to player 1 selection
        } else {
        window.location.href = "./start.html?single-player-name=Ok";
        }
        });
    }
});