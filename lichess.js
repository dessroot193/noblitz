const mainPageButtons = document.querySelectorAll(".lpool");
const targets = ["1+0", "2+1", "3+0", "3+2", "5+0", "5+3", "bullet", "blitz"];
if (mainPageButtons) {
  for (const button of mainPageButtons) {
    if (targets.includes(button.getAttribute("data-id"))) {
      button.remove();
    }
  }
}

const profileRatings = document
  .querySelector(".side.sub-ratings")
  .querySelectorAll(":scope > a");
if (profileRatings) {
  for (const rating of profileRatings) {
    if (rating.tagName == "A") {
      if (targets.includes(rating.href.split("/").reverse()[0])) {
        rating.remove();
      }
    }
  }
}
