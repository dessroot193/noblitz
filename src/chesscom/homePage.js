import * as config from '../config.js'

async function losesCheck(){
  const date = new Date();
  try {
  const response = await fetch(`https://api.chess.com/pub/player/${config.chesscomUser}/games/${date.getFullYear()}/${"0" + (date.getMonth()+1)}`);
  if(response.ok){
    let lastGames = await response.json();
    lastGames = lastGames["games"].reverse();
    const lastGameDate = lastGames[0]["end_time"];
    const lastGameDiff = Math.floor(Date.now()/1000) - lastGameDate;
    if(lastGameDiff <= config.lossCoolDown){
      let loses = 0;
      for(let i = 0;i<config.lossLimit;i++){
        const pgn = lastGames[i]["pgn"];
        loses += !pgn.includes(`${config.chesscomUser} won`) || !pgn.includes("drawn")
        if(config.lossLimit == loses){
          window.alert("hey dumbass you lost 2 in row")
        }
      }
    }
  }
  else{ 
    throw new Error(response.status);
  }
  } catch(e){
  console.error('Error:', e);
  }
  return 1;
}

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
if(losesCheck()){
homePage();
}