export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Inter';
    this.livesImage = document.querySelector('#lives');
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'white';
    context.shadowBlur = 0;

    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    // score
    context.fillText('Distance: ' + this.game.distance.toFixed(0)  + ' m', 20, 50);
    // timer
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
    context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
    // lives
    for(let i=0; i<this.game.lives; i++) {
      context.drawImage(this.livesImage, 30 * i + 20, 95, 25, 25);
    }
    //game over messages
    if(this.game.gameOver) {
      context.textAlign = 'center';

      context.font = this.fontSize * 2.5 + 'px ' + this.fontFamily;
      context.fillText('Distance: ' + this.game.distance.toFixed(0) + ' m', this.game.width * 0.5, this.game.height * 0.5 - 20);

      context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
      context.fillText('You can do better... Swipe up to restart', this.game.width * 0.5, this.game.height * 0.5 + 25);


    }
    context.restore();
  }
}