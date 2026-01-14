


// Get query params
const params = new URLSearchParams(window.location.search);
const totalRounds = parseInt(params.get("rounds"));

// get current round
let currentRound = parseInt(params.get("current") || 1);

// set round and current
params.set("current", currentRound);

// Display logic
const roundDisplay = document.getElementById("round-display");
if (currentRound < totalRounds) {
  roundDisplay.textContent = "Round " + currentRound;
} else if (currentRound === totalRounds) {
  roundDisplay.textContent = "Final Round!";
}

  //after 2 secs go to next page
  /*setTimeout(() => {
    window.location.href = "player-1-selection.html?" + params.toString();
}, 2000);

} else if (currentRound === totalRounds) {
  roundDisplay.textContent = "Final Round!";

  // When all rounds finished - redirect to results page
  setTimeout(() => {
  window.location.href = "results.html";
}, 2000);
}*/

const next = document.getElementById("next");
next.addEventListener("click", () => {
  window.location.href = "./player-1-selection.html?" + params.toString();
})
