
        
        // Read names from query string 
        const params = new URLSearchParams(window.location.search); 
        const singlePlayerName = params.get("single-player-name"); 

        document.querySelector("#singlePlayerName").textContent = singlePlayerName + ","; 


        function getPlayerSelection() {
            const buttons = document.querySelectorAll("button[data-choice]");

            buttons.forEach(currentItem => {
                currentItem.addEventListener("click", () => {
                const player1Choice = currentItem.dataset.choice;   
                const compChoice = getComputerSelection();   
                     
                passChoicesToDisplay(player1Choice, compChoice);    
                });
            });
        }

        function getComputerSelection() {
            const numbersChoiceMap = {
                1: "rock",
                2: "paper",
                3: "scissors"
            };

            const computerChoice = numbersChoiceMap[numberGenerator()];
            return computerChoice;
        }

        function passChoicesToDisplay(player1Choice, compChoice) {
            window.location.href =
            "../pages/display.html?player1Choice=" + encodeURIComponent(player1Choice) +
            "&compChoice=" + encodeURIComponent(compChoice);
        }

        // initialize wiring once DOM is ready
        getPlayerSelection();