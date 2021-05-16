// DARK THEME TOGGLE

const body = document.getElementsByTagName("BODY")[0];
const darkThemeButton = document.querySelector(".dark-theme-toggle-container");

let themePrefCheck = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (themePrefCheck == true) {
  body.classList.add("dark");
}

darkThemeButton.addEventListener("click", () => {
  body.classList.toggle("dark");
});
