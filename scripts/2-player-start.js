

const captureButton = document.querySelector(".main.selector button");
captureButton.addEventListener("click", () => {
    captureNames();
});

function captureNames () {
    const Player1Name = capitalizeFirstletter(
    document.getElementById("player1Name").value);
    const player2Name = capitalizeFirstletter (
    document.getElementById("player2Name").value);

    // check if name was entered
    if (!Player1Name) {
    alert("Please enter a name for Player 1 before proceeding");
    return;
    }
    if (!player2Name) {
    alert("Please enter a name for Player 2 before proceeding");
    return;
    }

    //build query parameters
    const params = new URLSearchParams();
    params.set("player1", Player1Name);
    params.set("player2", player2Name);
    params.set("mode", "multi");

    window.location.href = "./round-select.html?" + params.toString();
}

function capitalizeFirstletter (name) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
}