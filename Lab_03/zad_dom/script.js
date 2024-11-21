const _spriteWidth = 2000 / 10;
const _spriteHeight = 312;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const gameBoard = document.getElementById("game_board");
const spawnerElement = document.getElementById("spawner");
const scoreEndElement = document.getElementById("span_end_score");
const currentScoreElement = document.getElementById("span_current_score");
const popUpElement = document.getElementById("popup");
const heartsElement = document.getElementById("hearts_wrapper");
const cursorImg = new Image();
cursorImg.src = "./images/aim.png";
function createFullHeartImg() {
  const fulllHeartImg = new Image();
  fulllHeartImg.src = "./images/full_heart.png";
  fulllHeartImg.height = 128;
  fulllHeartImg.width = 128;
  return fulllHeartImg;
}
function createEmptyHeartImg() {
  const emptyHeartImg = new Image();
  emptyHeartImg.src = "./images/empty_heart.png";
  emptyHeartImg.height = 128;
  emptyHeartImg.width = 128;
  return emptyHeartImg;
}
cursorImg.onload = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 128;
  canvas.height = 128;
  ctx.drawImage(cursorImg, 0, 0, 128, 128);
  const resizedCursor = canvas.toDataURL("./images/aim.png");
  gameBoard.style.cursor = `url(${resizedCursor}) 64 64, auto`;
};
class Zombie {
  constructor({
    name,
    speedX,
    staggerFrames,
    scaleSize,
    spriteWidth,
    spriteHeight,
    posX,
    posY,
    img,
  }) {
    this.name = name;
    this.speedX = speedX;
    this.staggerFrames = staggerFrames;
    this.scaleSize = scaleSize;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.posX = posX;
    this.posY = posY;
    this.numberOfSpriteFrames = 10;
    this.currentSpriteFrame = 0;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = spriteWidth * scaleSize;
    this.canvas.height = spriteHeight * scaleSize;
    this.canvas.style.position = "absolute";
    this.canvas.style.left = `${posX}px`;
    this.canvas.style.top = `${posY}px`;
    this.isGone = false;
    this.position = 0;
    this.img = img;
    spawnerElement.appendChild(this.canvas);
    this.isHit = false;
    this.canvas.addEventListener("click", () => this.hit());
  }
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.position =
      Math.floor(this.currentSpriteFrame / this.staggerFrames) %
      this.numberOfSpriteFrames;
    if (this.posX < -this.spriteWidth * this.scaleSize) {
      this.canvas.style.visibility = "hidden";
      this.isGone = true;
      return;
    }
    this.posX += this.speedX;
    this.posY = this.newPosY;
    this.canvas.style.left = `${this.posX}px`;
    this.canvas.style.top = `${this.posY}px`;
    this.draw();

    this.currentSpriteFrame++;
  }
  draw() {
    this.ctx.drawImage(
      this.img,
      this.position * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0,
      0,
      this.spriteWidth * this.scaleSize,
      this.spriteHeight * this.scaleSize
    );
  }
  hit() {
    //alert("Trafiony");
    this.canvas.style.visibility = "hidden";
    this.isGone = true;
    this.isHit = true;
  }
}
let isRunning = true;
let currenthearts = 3;
let currentScore = 0;
let zombieList = [];
gameBoard.onclick = () => {
  if (currentScore > 5) {
    currentScore -= 5;
  }
  currentScoreElement.textContent = String(currentScore).padStart(5, "0");
};
async function createZombies(spriteImg) {
  let currentZombies = 0;
  let threshold = 20;
  while (isRunning) {
    const numberSpawnZombie = Math.floor(Math.random() * (8 - 1)) + 1; // [1,8] in miliseconds
    const delayToSpawn = Math.floor(Math.random() * (500 - 50)) + 50; // [50,500] in miliseconds
    for (let i = 0; i < numberSpawnZombie; i++) {
      const scaleZombie = Math.random() * 0.8 + 0.5;
      const positionYZombie =
        window.innerHeight -
        scaleZombie * 312 -
        (Math.floor(Math.random() * (200 - 50)) + 50);
      const zombieSpeed = Math.random() * (6 - 2) + 2;
      await sleep(delayToSpawn);
      currentZombies++;
      if (currentZombies == threshold) {
        await sleep(8000).then(() => {
          currentZombies = 0;
          threshold += 5;
        });
      } else {
        //alert(zombieSpeed);
        zombieList.push(
          new Zombie({
            name: "zombie",
            speedX: -zombieSpeed,
            staggerFrames: 5,
            scaleSize: scaleZombie,
            spriteWidth: _spriteWidth,
            spriteHeight: _spriteHeight,
            posX: window.innerWidth,
            posY: positionYZombie,
            img: spriteImg,
          })
        );
      }
    }
  }
}
let animationFrameId = 0;
function startGame() {
  popUpElement.style.display = "none";
  isRunning = true;
  currentScore = 0;
  currenthearts = 3;
  spriteImg = new Image();
  spriteImg.src = "./images/walkingdead.png";
  drawHearts();
  this.spriteImg.onload = () => {
    createZombies(spriteImg);
    animate();
  };
}
function stopGame() {
  cancelAnimationFrame(animationFrameId);
  isRunning = false;
  scoreEndElement.textContent = String(currentScore).padStart(5, "0");
  currentScoreElement.textContent = String(currentScore).padStart(5, "0");
  popUpElement.style.display = "flex";
  zombieList = [];
  while (heartsElement.hasChildNodes()) {
    heartsElement.removeChild(heartsElement.firstChild);
  }
  while (spawnerElement.hasChildNodes()) {
    spawnerElement.removeChild(spawnerElement.firstChild);
  }
}
function drawHearts() {
  switch (currenthearts) {
    case 3: {
      heartsElement.appendChild(createFullHeartImg());
      heartsElement.appendChild(createFullHeartImg());
      heartsElement.appendChild(createFullHeartImg());
      break;
    }
    case 2: {
      heartsElement.removeChild(heartsElement.firstChild);
      heartsElement.appendChild(createEmptyHeartImg());
      break;
    }
    case 1: {
      heartsElement.removeChild(heartsElement.firstChild);
      heartsElement.appendChild(createEmptyHeartImg());
      break;
    }
    case 0: {
      if (heartsElement.hasChildNodes())
        heartsElement.removeChild(heartsElement.firstChild);
      heartsElement.appendChild(createEmptyHeartImg());
      break;
    }
  }
}
function animate() {
  animationFrameId = requestAnimationFrame(animate);
  zombieList.forEach((z) => {
    if (z.isHit) {
      currentScore += 25;
    } else if (!z.isHit && z.isGone) {
      currenthearts -= 1;
      drawHearts();
    }
    currentScoreElement.textContent = String(currentScore).padStart(5, "0");
  });
  if (currenthearts == 0) {
    stopGame();
    return;
  }
  zombieList = zombieList.filter((zombie) => !zombie.isGone);
  zombieList.forEach((z) => z.animate());
}
const playAgain = document.getElementById("btn_play_again");
playAgain.onclick = () => {
  startGame();
};
startGame();
