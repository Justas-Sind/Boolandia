class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if(this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
  restart() {
    this.x = 0;
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 512;
    this.layer1image = document.querySelector('#layer1');
    this.layer2image = document.querySelector('#layer2');
    this.layer3image = document.querySelector('#layer3');
    this.layer4image = document.querySelector('#layer4');
    this.layer5image = document.querySelector('#layer5');
    this.layer6image = document.querySelector('#layer6');
    this.layer7image = document.querySelector('#layer7');
    this.layer1 = new Layer(this.game, this.width, this.height, 0.1, this.layer1image);
    this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);
    this.layer3 = new Layer(this.game, this.width, this.height, 0.3, this.layer3image);
    this.layer4 = new Layer(this.game, this.width, this.height, 0.4, this.layer4image);
    this.layer5 = new Layer(this.game, this.width, this.height, 0.95, this.layer5image);
    this.layer6 = new Layer(this.game, this.width, this.height, 1, this.layer6image);
    this.layer7 = new Layer(this.game, this.width, this.height, 0.05, this.layer7image);
    this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, this.layer7];
  }
  update() {
    this.backgroundLayers.forEach(layer => {
      layer.update();
    });
  }
  draw(context) {
    this.backgroundLayers.forEach(layer => {
      layer.draw(context);
    });
  }
  restart() {
    this.backgroundLayers.forEach(layer => {
      layer.restart();
    });
  }
}