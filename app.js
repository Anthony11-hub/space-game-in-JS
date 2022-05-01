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

function createEnemies(ctx, canvas, enemyImg) {
  // TODO draw enemies
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * 98;
  const START_X = (canvas.width - MONSTER_WIDTH)/2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for(let x = START_X; x<STOP_X; x+=98){
    for (let y = 0;y<50*5;y+=50){
      ctx.drawImage(enemyImg, x, y);
    }
  }
}

window.onload = async () => {//use of fat arrow functions
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  // TODO load textures
  const enemyImg = await loadTexture('assets/enemyShip.png')
  const heroImg = await loadTexture('assets/player.png');
  // TODO draw black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);
  // TODO draw hero
  ctx.drawImage(heroImg, canvas.width/2 - 45,canvas.height - canvas.height/4)
  // TODO uncomment the next line when you add enemies to screen
  createEnemies(ctx, canvas, enemyImg);
}
