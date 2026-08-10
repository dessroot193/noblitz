const mainPageButtons = document.querySelectorAll(".lpool");
if (mainPageButtons) {
  for (const button of mainPageButtons) {
    if (targets.includes(button.getAttribute("data-id"))) {
      button.remove();
    }
  }
}