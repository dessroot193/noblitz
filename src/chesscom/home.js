import { targets, timeControls } from '../utils.js'
function eventEdit(button){
  button.removeEventListener('')
}
function homePage() {
  const homePageButtons = document.querySelectorAll(
    ".cc-button-component.cc-button-secondary.cc-button-medium.cc-bg-secondary.time-selector-button-button",
  );
  const playButton = document.querySelector(".cc-button-component.cc-button-primary.cc-button-large.cc-bg-primary.cc-button-full");
  if (homePageButtons) {
    homePageButtons.forEach((button, i) => {
    button.children[0].textContent = `${timeControls[i][0] / 60}+${timeControls[i][1]}`;
    button.addEventListener("click", (e) => {
      let href = playButton.href;
      href = href.split("&").reverse();
      href[0] = `timeIncrement=${timeControls[i][1]}`
      href[1] = `base=${timeControls[i][0]}`
      playButton.href = href.reverse().join("&")
      })
    })
  }
}
homePage();