import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';

const gameArea = document.querySelector('.gameArea');
const waveLoader = document.querySelector('.waveLoader');
const gameStartButton = document.querySelector('.gameStartButton');
const landingPage = document.querySelector('.landingPage');
gameStartButton.addEventListener('click', () => {
  gameArea.classList.add('gameStart');
  landingPage.classList.add('displayNone')
})

window.addEventListener('load', function() {
  const canvas = document.querySelector('#canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1300;
  canvas.height = 512;
  const fullScreenButton = document.querySelector('#fullScreenButton');

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 40;
      this.speed = 0;
      this.maxSpeed = 4;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      // floating messages
      this.floatingMessages = [];
      //
      this.maxParticles = 50;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = 'black';
      // Game time limit
      this.time = 0;
      this.maxTime = 3600000;
      this.gameOver = false;
      // lives
      this.lives = 3;
      // distance
      this.distance = 0;
      this.distanceModifier = 0.025;
      //
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      // Game time limit
      this.time += deltaTime;
      if(this.time > this.maxTime) this.gameOver = true;
      //
      // distance
      if(this.player.currentState !== this.player.states[0]) this.distance += this.distanceModifier;
      //
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handle enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
        
      })
      // handle messages
      this.floatingMessages.forEach(message => {
        message.update();
      })
      // handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
      })
      if(this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      // handle collision sprites 
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });
      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
      this.particles = this.particles.filter(particle => !particle.markedForDeletion);
      this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
      this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      this.particles.forEach(particle => {
        particle.draw(context);
      });
      this.collisions.forEach(collision => {
        collision.draw(context);
      });
      this.floatingMessages.forEach(message => {
        message.draw(context);
      })
      this.UI.draw(context);
    }
    addEnemy() {
      if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
      else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));

      this.enemies.push(new FlyingEnemy(this));
    }
    restartGame() {
      this.player.restart();
      this.background.restart();
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.score = 0;
      this.time = 0;
      this.lives = 3;
      this.distance = 0;
      this.gameOver = false;
      animate(0);
    }
  }
  
  
  function toggleFullScreen() {
    if(!document.fullscreenElement) {
      canvas.requestFullscreen().catch(err => alert(`Error: ${err.message}`))
    }else {
      document.exitFullscreen();
    }
  }

  fullScreenButton.addEventListener('click', toggleFullScreen);

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    console.log('loaded');
    waveLoader.classList.add('displayNone');
    gameStartButton.classList.remove("displayNone");
  }
};