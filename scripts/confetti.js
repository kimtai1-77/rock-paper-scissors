function launchConfetti() {
  const winner = document.getElementById("winner-message");
  const rect = winner.getBoundingClientRect();
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

    winner.appendChild(confetti);

    // remove after animation
    setTimeout(() => confetti.remove(), 3000);
  }, 50);

  // stop spawning after 3 seconds
  setTimeout(() => clearInterval(interval), 3000);
}

// trigger when page loads
window.addEventListener("load", launchConfetti);
