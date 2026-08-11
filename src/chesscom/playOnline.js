import * as config from '../config.js'
function playOnlinePage() {
  const playOnlineSelector = document.getElementsByClassName(
    "time-selector-section-component",
  );
  if (playOnlineSelector) {
    for (section of playOnlineSelector) {
      if (config.targets.includes(section.children[0].children[1].textContent)) {
        section.remove();
      }
    }
  }
}

const observer = new MutationObserver((mutations) => {
  playOnlinePage();
});

const targetNode =
  document.querySelector(".time-selector-next-component") || document.body;

observer.observe(targetNode, {
  childList: true,
  subtree: true,
});
