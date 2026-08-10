import { targets } from '../utils.js'
function profilePage() {
  const profilePageStats = document.querySelectorAll(
    ".overview-stats-item-component",
  );
  if (profilePageStats) {
    console.log("a");
    for (const stats of profilePageStats) {
      if (targets.includes(stats.href.split("/").reverse()[0])) {
        stats.remove();
      }
    }
  }
}

const observer = new MutationObserver((mutations) => {
  profilePage();
});

const targetNode =
  document.querySelector(".overview-stats-items") || document.body;

observer.observe(targetNode, {
  childList: true,
  subtree: true,
});
