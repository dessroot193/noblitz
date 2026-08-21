import * as config from './config.js'

export async function losesCheck(){
  const date = new Date();
  try {
  const chesscomRequest = await fetch(`https://api.chess.com/pub/player/${config.chesscomUser}/games/${date.getFullYear()}/${(date.getMonth()<9?"0":"") + (date.getMonth()+1)}`);
  if(chesscomRequest.ok){
    let lastGames = await chesscomRequest.json();
    lastGames = lastGames["games"].reverse();
    const lastGameDate = lastGames[0]["end_time"];
    const lastGameDiff = Math.floor(Date.now()/1000) - lastGameDate;
    if(lastGameDiff <= config.lossCoolDown){
      let loses = 0;
      for(let i = 0;i<config.lossLimit;i++){
        const pgn = lastGames[i]["pgn"];
        loses += !pgn.includes(`${config.chesscomUser} won`) && !pgn.includes("drawn")
        if(config.lossLimit == loses){
          window.alert("hey dumbass you lost 2 in row")
        }
      }
    }
  }
  else{ 
    throw new Error(chesscomRequest.status);
  }
  } catch(e){
  console.error('Error:', e);
  }
  return 1;
  try{
    const lichessRequest = await fetch("")
  }
  catch(e){}
}


export function removeByChildTextContent(parentClass,childClass){
  const parent = document.querySelectorAll(parentClass);
  if(parent){
    for(const child of parent){
      const children = child.querySelector(childClass);
      if(children){
      if (config.targets.some(target => children.textContent.includes(target)))
       {
        child.remove();
      }
    }
  }
  }
}
