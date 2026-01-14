

const params = new URLSearchParams(window.location.search); 
const player1Name = params.get("player1") || "Player 1"; 
const player2Name = params.get("player2") || "Player 2";

// Update the display with Player 1's name & turn
document.querySelector("#player1Name").textContent = player1Name + ","; 
document.querySelector(".player-turn").textContent = "🏁 " + player1Name + "'s turn";

//Wire up buttons 
document.querySelectorAll(".buttons button").forEach(currentItem => {
    currentItem.addEventListener("click", () => { 
        const player1Choice = currentItem.getAttribute("data-choice"); 
        
        // add player 1 choice in the params for Player 2 page 
        params.set("player1Choice", player1Choice);
        
        // Redirect to Player 2 selection page 
        window.location.href = "./player-2-selection.html?" + params.toString();
        });
});