import * as config from './config.js'
import * as utils from './utils.js'

utils.losesCheck();

function homePage() {
  const homePageButtons = document.querySelectorAll(
    ".cc-button-component.cc-button-secondary.cc-button-medium.cc-bg-secondary.time-selector-button-button",
  );
  const playButton = document.querySelector(".cc-button-component.cc-button-primary.cc-button-large.cc-bg-primary.cc-button-full");
  if (homePageButtons) {
    homePageButtons.forEach((button, i) => {
    button.children[0].textContent = `${config.timeControls[i][0] / 60}+${config.timeControls[i][1]}`;
    button.addEventListener("click", (e) => {
      let href = playButton.href;
      href = href.split("&").reverse();
      href[0] = `timeIncrement=${config.timeControls[i][1]}`
      href[1] = `base=${config.timeControls[i][0]}`
      playButton.href = href.reverse().join("&")
      })
    })
  }
  }
function closeBoard(){
  const block = document.createElement("img");
  block.src = browser.runtime.getURL("images/blocker.png");
  block.className = "noblitz-chesscom-blocker";
  const board = document.querySelector("#board-layout-chessboard");
  board.append(block);
}
function openBoard(){
  document.querySelector(".noblitz-chesscom-blocker").remove()
}
function tickObserver(targetClock,player,clocks,blocked){
  const tickObserver = new MutationObserver((tick) => {
    if(!blocked.is){
    if(targetClock != player){
      closeBoard();
      blocked.is = true;
    }}
    else {
      if(targetClock == player){
        openBoard();
        blocked.is = false;
      }
    }
   })
    tickObserver.observe(clocks[targetClock], {
    childList: true,
    subtree: true,
    attributes: true
});
}
function blockOnOpponentMove(){
  const playerTop = document.querySelector("#player-top");
  const playerBottom = document.querySelector("#player-bottom");
  if(playerTop && playerBottom){
  const player = playerTop.querySelector(".cc-user-username-component").textContent == config.chesscomUser? "top" : "bottom";
  const clocks = {
  "top": playerTop.querySelector(".move-time-time"),
  "bottom": playerBottom.querySelector(".move-time-time")
  }
  let blocked = {is: false};
  tickObserver("top", player,clocks,blocked);
  tickObserver("bottom", player,clocks,blocked);
  }
}

const observer = new MutationObserver((mutations) => {
  blockOnOpponentMove();
  const recentSelector = document.querySelector(".recent-time-section-component");
  if(recentSelector){
    recentSelector.remove();
  }
  utils.removeByChildTextContent(".stat-item-stats-section",".cc-aside-item-label.cc-text-medium-bold")
  utils.removeByChildTextContent(".time-selector-section-component",".time-selector-section-label");
  utils.removeByChildTextContent(".overview-stats-item-component",".cc-text-small-bold.overview-stats-item-name");
  utils.removeByChildTextContent(".all-stats-item-row",".cc-heading-xx-small-bold.all-stats-item-name");
  utils.removeByChildTextContent(".cc-aside-item-component.cc-transition-bg-hover.stats-dropdown-item",".cc-aside-item-label.cc-text-medium-bold")
  utils.removeByChildTextContent(".tournaments-list-item-details",".tournaments-list-item-event-label");
  utils.removeByChildTextContent(".tournament-event-component.tournaments-calendar-event",".tournament-event-name");
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});