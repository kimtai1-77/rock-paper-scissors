
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const player1Name = params.get("player1");
  const player2Name = params.get("player2");

function showResults() {
  const winnerMessage = document.getElementById("winner-message");

  // read mode and names from URL - use global variables

  // read scores from sessionStorage
  const player1Wins = parseInt(sessionStorage.getItem("player1Wins")) || 0;
  const player2Wins = parseInt(sessionStorage.getItem("player2Wins")) || 0;
  const computerWins = parseInt(sessionStorage.getItem("computerWins")) || 0;

  let message = "";

  if (mode === "multi") {
    if (player1Wins > player2Wins) {
      message = player1Name + " Wins!";
    } else if (player2Wins > player1Wins) {
      message = player2Name + " Wins!";
    } else {
      message = "Shoot! It's a tie!";
    }
  } else {
    if (player1Wins > computerWins) {
      message = "You win!";
    } else if (computerWins > player1Wins) {
      message = "Computer wins!";
    } else {
      message = "Shoot! It's a tie!";
    }
  }

  winnerMessage.textContent = message;

  // launch confetti splash
  launchConfetti(winnerMessage);
}

function launchConfetti(originElement) {
  const rect = originElement.getBoundingClientRect();
  const originX = rect.width / 2;
  const originY = rect.height / 2;
  const colors = ["#ff0", "#f0f", "#0ff", "#0f0", "#f00", "#00f"];

  const interval = setInterval(() => {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = originX + "px";
    confetti.style.top = originY + "px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // random trajectory
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 300 + 50;
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    confetti.style.setProperty("--x", x);
    confetti.style.setProperty("--y", y);

    originElement.appendChild(confetti);

    // remove after animation
    setTimeout(() => confetti.remove(), 6000);
  }, 50);

  // stop spawning after 6 seconds
  setTimeout(() => clearInterval(interval), 6000);
}

// run when page loads
window.addEventListener("load", showResults);
updateParams();

function updateParams() {
  const newParams = new URLSearchParams();
  newParams.set("player1", player1Name);
  newParams.set("player2", player2Name);
  newParams.set("mode", mode);


  const playAgain = document.querySelector("#play-again");
  playAgain.addEventListener("click", () => {

    sessionStorage.removeItem("player1Wins");
    sessionStorage.removeItem("player2Wins");
    sessionStorage.removeItem("ties");

  window.location.href = "./round-select.html?" + newParams.toString();
  })
}

const goHome = document.querySelector(".return");
goHome.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "../index.html";
})
