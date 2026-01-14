
let radioButtons;

// store value for radio buttons
radioButtons = document.querySelectorAll('input[type="radio"]');

radioButtons.forEach(currentItem => {
    currentItem.addEventListener("change", () => {
        if (currentItem.dataset.value === "3-rounds") {
            updateGameParams(3);
        } else if (currentItem.dataset.value === "5-rounds") {
            updateGameParams(5);
        } else {
            updateGameParams(7);
        }
    })
})


const playButton = document.querySelector('button[data-choice="play"]'); 
playButton.addEventListener("click", () => {

    // make sure a radio button has been selected.
    const selected = document.querySelector('input[type="radio"]:checked');

    if (!selected) {
        alert("You have not selected any rounds. Please select to proceed")
    } else {
    const params = new URLSearchParams(window.location.search);
    window.location.href = "../pages/round-counter.html?" + params.toString();
    }
    })


function updateGameParams (rounds) {

    // step: 1 - get params
    const params = new URLSearchParams (window.location.search);

    // step 2 - update or add params
    params.set("rounds", rounds.toString());


    // step 3 - build new URL
    const newUrl = window.location.pathname + "?" + params.toString();

    // step 4 - push new URL into browser
    history.pushState({}, "", newUrl);
}