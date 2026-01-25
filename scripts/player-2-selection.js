

    // Read names and Player 1 choice from query string
    const params = new URLSearchParams(window.location.search);
    const player1Name = params.get("player1"); 
    const player2Name = params.get("player2"); 
    const totalRounds = params.get("rounds");
    const currentRound = params.get("current");
    const player1Choice = params.get("player1Choice"); 

    
    // Update the span with Player 2's name and turn
    document.getElementById("player2Name").textContent = player2Name + ","; 
    document.querySelector(".player-turn").textContent = "🏁 " + player2Name + "'s turn";

    
    // Wire up buttons 
    document.querySelectorAll(".buttons button").forEach(btn => { 
        btn.addEventListener("click", () => { 
            const player2Choice = btn.getAttribute("data-choice"); 
            
            // add player 2's choice to the params 
            params.set("player2Choice", player2Choice);

            if ((parseInt(currentRound)) === parseInt(totalRounds)) {
                window.location.href = "./results.html?" + params.toString();
            } else {
            
            // Redirect to display page 
            window.location.href = "./display.html?" + params.toString(); 
            }
        });
    });

    