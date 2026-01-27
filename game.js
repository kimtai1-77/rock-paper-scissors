
// configure home button

  function goHome() {

    // reset session storage
      sessionStorage.clear();

    //redirect to index.html
      window.location.href = "../index.html";
    };



// Toggle arrows
const arrowDown = document.getElementById("arrow-down");
const arrowUp = document.getElementById("arrow-up");
const buttonsOuter = document.querySelector(".buttons-outer");

arrowDown.addEventListener("click", () => {
  arrowDown.classList.toggle("hidden");
  arrowUp.classList.toggle("hidden");
  buttonsOuter.classList.toggle("hidden");
});

arrowUp.addEventListener("click", () => {
  arrowUp.classList.toggle("hidden");
  arrowDown.classList.toggle("hidden");
  buttonsOuter.classList.toggle("hidden");
});



function numberGenerator() {
  return Math.floor(Math.random() * 3) + 1;
}


function getWinner(choice1, choice2) {
  choice1 = choice1.toLowerCase();
  choice2 = choice2.toLowerCase();

  if (choice1 === choice2) {
    return "tie";
  }

    const beats = {
      rock: "scissors",
      scissors: "paper",
      paper: "rock"
    }; 

  // if choice1 beats choice2 -> player 1 (or human in single mode) 
  if (beats[choice1] === choice2) {
      return "player1";
    } else {
      //player 2 (or computer in single mode)
      return "player2";
    }
}

function capitalizeFirstletter (name) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
}