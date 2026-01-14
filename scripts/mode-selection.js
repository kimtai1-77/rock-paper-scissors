
// captures user selection for mode (2p or 1p) and navigates to respective page depending on mode

window.addEventListener("DOMContentLoaded", () => {
    getSelection();
})

    function getSelection () {
        const selectButton = document.querySelectorAll("button[data-selection]");
        selectButton.forEach(currentItem => {
            currentItem.addEventListener("click", () => {
                const selection = currentItem.dataset.selection;

                if (selection === "1Player") {
                    //pass mode into URL
                    window.location.href = "../pages/player-enter-name.html?mode=single";

                } else if (selection === "2Player") {
                    window.location.href = "../pages/2-player-start.html?mode=multi";
                };
            });
        });
    }