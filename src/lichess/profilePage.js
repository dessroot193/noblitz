import * as config from '../config.js'
const profileRatings = document
  .querySelector(".side.sub-ratings")
  .querySelectorAll(":scope > a");
if (profileRatings) {
  for (const rating of profileRatings) {
    if (rating.tagName == "A") {
      if (config.targets.includes(rating.href.split("/").reverse()[0])) {
        rating.remove();
      }
    }
  }
}