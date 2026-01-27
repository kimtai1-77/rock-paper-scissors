

    const proceedButton = document.querySelector('[data-action="proceed"]');
    proceedButton.addEventListener("click", () => {
        captureName();
    })
    
    function captureName () {
        const singlePlayerName = capitalizeFirstletter(
        document.getElementById("singlePlayerName").value);

        // check if name is empty
        if (!singlePlayerName) {
            alert("Please enter a name before proceeding")
            return;
        }

        //build query parameters
        const params = new URLSearchParams();
        params.set("single-player-name", singlePlayerName);
        params.set("mode", "single");

        window.location.href = "./start.html?" + params.toString();
    }