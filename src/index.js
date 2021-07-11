import './index.scss';
import ClientGame from './client/ClientGame';

// import worldCfg from './configs/world.json';
// import sprites from './configs/sprites';

// import Cloud from './assets/sprite_cloud.png';
// import terrainAtlas from './assets/terrain.png';

// const canvas = document.querySelector('#game');
// const context = canvas.getContext('2d');

// const spriteW = 48;
// const spriteH = 48;
// const maxAreaW = canvas.clientHeight - spriteW;
// const maxAreaH = canvas.clientWidth - spriteH;

// const shots = 3;
// let cycle = 1;

// let bottomPressed = null;
// let characterDirection = 0;

// let pY = maxAreaH / 2;
// let pX = maxAreaW / 2;

// const img = document.createElement('img');
// const terrain = document.createElement('img');

// terrain.src = terrainAtlas;
// img.src = Cloud;

// function keyDownHandler(e) {
//   if (e.key === 'ArrowDown' || e.key === 'down')    bottomPressed = 'down';
//   if (e.key === 'ArrowLeft' || e.key === 'left')    bottomPressed = 'left';
//   if (e.key === 'ArrowRight' || e.key === 'right')  bottomPressed = 'right';
//   if (e.key === 'ArrowUp' || e.key === 'up')        bottomPressed = 'up';
// }

// function keyUpHandler(e) {
//   if (e.key === 'ArrowDown' || e.key === 'down')    bottomPressed = null;
//   if (e.key === 'ArrowLeft' || e.key === 'left')    bottomPressed = null;
//   if (e.key === 'ArrowRight' || e.key === 'right')  bottomPressed = null;
//   if (e.key === 'ArrowUp' || e.key === 'up')        bottomPressed = null;
// }

// function walk(tamestamp) {
//   if (bottomPressed) {
//     if (bottomPressed === 'down') {
//       characterDirection = img.height * 0;
//       if (pY + 10 < maxAreaH) pY += 10;
//     }
//     if (bottomPressed === 'left') {
//       characterDirection = img.height * 0.25;
//       if (pX - 10 >= 0) pX -= 10;
//     }
//     if (bottomPressed === 'right') {
//       characterDirection = img.height * 0.50;
//       if (pX + 10 < maxAreaW) pX += 10;
//     }
//     if (bottomPressed === 'up') {
//       characterDirection = img.height * 0.75;
//       if (pY - 10 >= 0) pY -= 10;
//     }
//     context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//     cycle = (cycle + 1) % shots;
//   }

// context.
// drawImage(img, cycle * spriteW, characterDirection, spriteW, spriteH, pX, pY, spriteW, spriteH);
//   window.requestAnimationFrame(walk);
// }

// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);

// img.addEventListener('load', () => {

//   let {map} = worldCfg;

//   map.forEach((cfgRow, y) => {
//     cfgRow.forEach((cfgSell, x)=> {
//       const [sX, sY, sW, sH] = sprites.terrain[cfgSell[0]].frames[0];
//       context.drawImage(terrain, sX, sY, sW, sH, x * spriteW, y * spriteH, spriteW, spriteH);
//     })
//   });

//   window.requestAnimationFrame(walk);
// });

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});
