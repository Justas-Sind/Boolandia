export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.touchX = '';
    this.touchY = '';
    this.touchTreshold = 30;
    window.addEventListener('keydown', e => {
      if((    e.key === 'ArrowDown' || 
              e.key === 'ArrowUp' ||
              e.key === 'ArrowLeft' ||
              e.key === 'ArrowRight' ||
              e.key === ' '
          ) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      } else if(e.key === 'd') {
        //this.game.debug = !this.game.debug;
      } else if(e.key === 'Enter' && this.game.gameOver) {
        this.game.restartGame();
      }
    });
    window.addEventListener('keyup', e => {
      if(   e.key === 'ArrowDown' || 
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === ' ') {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    })
    window.addEventListener('touchstart', e => {
      this.touchY = e.changedTouches[0].pageY;

      this.touchX = e.changedTouches[0].pageX;
      this.screenMiddle = e.view.innerWidth/2;
      if(this.touchX < this.screenMiddle && this.keys.indexOf('hold left') === -1 && this.keys.indexOf('hold right') === -1) this.keys.push('hold left');
      else if(this.touchX > this.screenMiddle && this.keys.indexOf('hold right') === -1 && this.keys.indexOf('hold left') === -1) this.keys.push('hold right');

      console.log(e)
    })
    window.addEventListener('touchmove', e => {
      const swipeDistance = e.changedTouches[0].pageY - this.touchY;
      if(swipeDistance < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
      else if(swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1) this.keys.push('swipe down');

      if(this.game.gameOver) {
        this.game.restartGame();
      }
    })
    window.addEventListener('touchend', e => {
      this.keys.splice(this.keys.indexOf('swipe up'), 1);
      this.keys.splice(this.keys.indexOf('swipe down'), 1);
      this.keys.splice(this.keys.indexOf('hold left'), 1);
      this.keys.splice(this.keys.indexOf('hold right'), 1);

    })
  }
}