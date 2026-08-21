import * as config from './config.js'
import * as utils from './utils.js'

utils.losesCheck()
const observer = new MutationObserver((mutations) => {
    utils.removeByChildTextContent(".tournament.rated",".icon");
    utils.removeByChildTextContent(".lpool",".perf");
    utils.removeByChildTextContent("a","h3");
    utils.removeByChildTextContent(".tsht.tsht-rated",".text");
    utils.removeByChildTextContent("tr",".setup");
    utils.removeByChildTextContent("tr",".body");
    utils.removeByChildTextContent(".tournament.rated",".body");
});

const targetNode = document.body;

observer.observe(targetNode, {
  childList: true,
  subtree: true,
});
