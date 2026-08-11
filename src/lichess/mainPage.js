import * as config from '../config.js'
const mainPageButtons = document.querySelectorAll(".lpool");
if (mainPageButtons) {
  for (const button of mainPageButtons) {
    if (config.targets.includes(button.getAttribute("data-id"))) {
      button.remove();
    }
  }
}