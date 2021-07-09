import './index.scss';
import Cloud from './assets/sprite_cloud.png';
import Grass from './assets/grass.png';

const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

const spriteW = 48;
const spriteH = 50;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let bottomType = 'stand';
let characterDirection = 0;
let pY = 270;
let pX = 270;

const grass = document.createElement('img');
const img = document.createElement('img');

grass.src = Grass;
img.src = Cloud;

function keyDownHandler(e) {
  if (e.key === 'ArrowDown' || e.key === 'down') {
    bottomPressed = true;
    bottomType = 'down';
  }
  if (e.key === 'ArrowLeft' || e.key === 'left') {
    bottomPressed = true;
    bottomType = 'left';
  }
  if (e.key === 'ArrowRight' || e.key === 'right') {
    bottomPressed = true;
    bottomType = 'right';
  }
  if (e.key === 'ArrowUp' || e.key === 'up') {
    bottomPressed = true;
    bottomType = 'up';
  }
}

function keyUpHandler(e) {
  if (e.key === 'ArrowDown' || e.key === 'down') bottomPressed = false;
  if (e.key === 'ArrowLeft' || e.key === 'left') bottomPressed = false;
  if (e.key === 'ArrowRight' || e.key === 'right') bottomPressed = false;
  if (e.key === 'ArrowUp' || e.key === 'up') bottomPressed = false;
}

function drawTriangle(x, y) {
  context.fillStyle = 'gray';
  context.strokeStyle = 'gray';

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + 15, y);
  context.lineTo(x + 7.5, y - 25);
  context.lineTo(x, y);
  context.fill();
}

function drawBackground() {
  context.fillStyle = 'limegreen';
  context.fillRect(0, 0, 600, 600);
  context.stroke();

  for (let i = 0; i < 200; i += 40) {
    for (let j = 0; j < 300; j += 50) {
      context.drawImage(grass, j, i, 50, 50);
    }
  }

  for (let i = 0; i < 200; i += 40) {
    for (let j = 400; j < 600; j += 50) {
      context.drawImage(grass, j, i, 50, 50);
    }
  }

  for (let i = 400; i < 600; i += 40) {
    for (let j = 0; j < 300; j += 50) {
      context.drawImage(grass, j, i, 50, 50);
    }
  }

  for (let i = 400; i < 600; i += 40) {
    for (let j = 400; j < 600; j += 50) {
      context.drawImage(grass, j, i, 50, 50);
    }
  }

  context.fillStyle = 'black';
  context.fillRect(0, 250, 600, 150);
  context.fillRect(300, 0, 100, 600);

  for (let i = 0, j = 250; i < 300; i += 15) drawTriangle(i, j);
  for (let i = 400, j = 250; i < 600; i += 15) drawTriangle(i, j);
  for (let i = 0, j = 400; i < 300; i += 15) drawTriangle(i, j);
  for (let i = 400, j = 400; i < 600; i += 15) drawTriangle(i, j);
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      if (bottomType === 'down') {
        characterDirection = 0;
        if (pY + 10 < 560) pY += 10;
      }
      if (bottomType === 'left') {
        characterDirection = 50;
        if (pX - 10 >= 0) pX -= 10;
      }
      if (bottomType === 'right') {
        characterDirection = 100;
        if (pX + 10 < 570) pX += 10;
      }
      if (bottomType === 'up') {
        characterDirection = 150;
        if (pY - 10 >= 0) pY -= 10;
      }
      context.clearRect(0, 0, 600, 600);
      cycle = (cycle + 1) % shots;
    }

    drawBackground();
    context.drawImage(img, cycle * spriteW, characterDirection, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});
