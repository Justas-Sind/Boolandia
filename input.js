export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.touchX = '';
    this.touchY = '';
    this.touchTreshold = 20;
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
      this.screenVerticalMiddle = e.view.innerHeight/2;
      this.screenMiddle = e.view.innerWidth/2;
      this.screenRightSideMiddle = this.screenMiddle + e.view.innerWidth/4;

      if(this.touchX < this.screenMiddle && this.keys.indexOf('left-side tap') === -1 && this.touchY > this.screenVerticalMiddle) this.keys.push('left-side tap');
      else if(this.touchX > this.screenMiddle && this.touchX < this.screenRightSideMiddle && this.keys.indexOf('hold right') === -1 && this.keys.indexOf('hold left') === -1) this.keys.push('hold left');
      else if(this.touchX > this.screenRightSideMiddle && this.keys.indexOf('hold right') === -1 && this.keys.indexOf('hold left') === -1) this.keys.push('hold right');

      if(e.target.id === 'arrowLeft' && this.keys.indexOf('hold left') === -1) this.keys.push('hold left')
      else if(e.target.id === 'arrowRight' && this.keys.indexOf('hold right') === -1) this.keys.push('hold right')
    })
    window.addEventListener('touchmove', e => {
      const swipeDistance = e.changedTouches[0].pageY - this.touchY;
      if(swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1 && this.touchX < this.screenMiddle && this.touchY < this.screenVerticalMiddle) this.keys.push('swipe down');

      if(this.game.gameOver) {
        this.game.restartGame();
      }
    })
    window.addEventListener('touchend', e => {
      if(this.keys.includes('hold left') || this.keys.includes('hold right')) {
        if(this.keys.includes('left-side tap')) {
          this.keys.splice(this.keys.indexOf('left-side tap'), 1);
        } else {
          this.keys.splice(this.keys.indexOf('swipe down'), 1);
          this.keys.splice(this.keys.indexOf('left-side tap'), 1);
          this.keys.splice(this.keys.indexOf('hold left'), 1);
          this.keys.splice(this.keys.indexOf('hold right'), 1);
        }
      } else {
        this.keys.splice(this.keys.indexOf('swipe down'), 1);
        this.keys.splice(this.keys.indexOf('left-side tap'), 1);
        this.keys.splice(this.keys.indexOf('hold left'), 1);
        this.keys.splice(this.keys.indexOf('hold right'), 1);
      }
    
    })
  }
}