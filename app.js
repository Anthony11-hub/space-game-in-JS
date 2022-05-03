class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(message, listener) {
    if (!this.listeners[message]) {
      this.listeners[message] = [];
    }
    this.listeners[message].push(listener);
  }

  emit(message, payload = null) {
    if (this.listeners[message]) {
      this.listeners[message].forEach((l) => l(message, payload));
    }
  }
}

class GameObject{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dead = false;
    this.type = "";
    this.width = 0;
    this.height = 0;
    this.img = undefined;
  }
  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// applying inheritance game design pattern
class Hero extends GameObject{
  constructor(x,y){
    super(x,y);
    (this.width = 99), (this.height = 75);
    this.type = 'Hero';
    this.speed = {x: 0, y:0};
  }
}

class Enemy extends GameObject{
  constructor(x,y){
    super(x,y);
    (this.width = 98), (this.height)
      this.type = "Enemy";
      let id = setInterval(() => {
        if(this.y < canvas.height - this.height){
          this.y += 5;
        }else{
          console.log('Stopped at', this.y)
          clearInterval(id)
        }
      }, 300)
  }
}


function loadTexture(path) {
  return new Promise((resolve) => {
    const img = new Image()//creating an image object to load and draw an image asset
    img.src = path
    img.onload = () => {
      // image loaded and ready to be used
      resolve(img)
    }
  })
}

function createEnemies() {
  // TODO draw enemies
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * 98;
  const START_X = (canvas.width - MONSTER_WIDTH)/2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for(let x = START_X; x<STOP_X; x+=98){
    for (let y = 0;y<50*5;y+=50){
      const enemy = new Enemy(x,y);
      enemy.img = enemyImg;
      gameObjects.push(enemy);
      // ctx.drawImage(enemyImg, x, y);
    }
  }
}

function initGame() {
  gameObjects = [];
  createEnemies();
  createHero();

  eventEmitter.on(Messages.KEY_EVENT_UP, () => {
    hero.y -=5 ;
  })

  eventEmitter.on(Messages.KEY_EVENT_DOWN, () => {
    hero.y += 5;
  });

  eventEmitter.on(Messages.KEY_EVENT_LEFT, () => {
    hero.x -= 5;
  });

  eventEmitter.on(Messages.KEY_EVENT_RIGHT, () => {
    hero.x += 5;
  });
}

// does a similar process for the hero
function createHero() {
  hero = new Hero(
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  );
  hero.img = heroImg;
  gameObjects.push(hero);
}
// function to start drawing
function createHero() {
  hero = new Hero(
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  );
  hero.img = heroImg;
  gameObjects.push(hero);
}

window.onload = async () => {//use of fat arrow functions
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  // TODO load textures
  const enemyImg = await loadTexture('assets/enemyShip.png')
  const heroImg = await loadTexture('assets/player.png');
  const laserImg = await loadTexture("assets/laserRed.png");
  // TODO draw black background
  initGame();
  let gameLoopId = setInterval(() => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    drawGameObjects(ctx);
  }, 100)
  // ctx.fillStyle = 'black';
  // ctx.fillRect(0,0, canvas.width, canvas.height);
  // TODO draw hero
  // ctx.drawImage(heroImg, canvas.width/2 - 45,canvas.height - canvas.height/4)
  // TODO uncomment the next line when you add enemies to screen
  // createEnemies(ctx, canvas, enemyImg);
};

// adding key-event handlers, preventing the default key 
let onKeyDown = function (e){
  console.log(e.keycode);
  switch (e.keycode){
    case 37:
    case 39:
    case 38:
    case 40:
    case 42:
    case 32:
      e.preventDefault();
      break;
    default:
      break;
  }
};

window.addEventListener('keydown', onKeyDown);

window.addEventListener("keyup", (evt) => {
  if (evt.key === "ArrowUp") {
    eventEmitter.emit(Messages.KEY_EVENT_UP);
  } else if (evt.key === "ArrowDown") {
    eventEmitter.emit(Messages.KEY_EVENT_DOWN);
  } else if (evt.key === "ArrowLeft") {
    eventEmitter.emit(Messages.KEY_EVENT_LEFT);
  } else if (evt.key === "ArrowRight") {
    eventEmitter.emit(Messages.KEY_EVENT_RIGHT);
  }
});

const Messages = {
  KEY_EVENT_UP: "KEY_EVENT_UP",
  KEY_EVENT_DOWN: "KEY_EVENT_DOWN",
  KEY_EVENT_LEFT: "KEY_EVENT_LEFT",
  KEY_EVENT_RIGHT: "KEY_EVENT_RIGHT",
};

let heroImg, 
    enemyImg, 
    laserImg,
    canvas, ctx, 
    gameObjects = [], 
    hero, 
    eventEmitter = new EventEmitter();








