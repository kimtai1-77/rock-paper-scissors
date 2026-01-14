
// Navigates from the home page to the mode-selection page

const startButton = document.querySelector("[data-action='start']");
    startButton.addEventListener("click", () => {
    window.location.href = "./pages/mode-selection.html";
});