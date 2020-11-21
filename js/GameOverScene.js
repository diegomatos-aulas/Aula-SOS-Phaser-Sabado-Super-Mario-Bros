export default class GameOverScene extends Phaser.Scene {
   constructor () {
     super("GameOverScene")
   }

   init ({level, texto}) {
    const {width, height} = this.sys.game.canvas;
    this.GAME_WIDTH = width;
    this.GAME_HEIGHT = height;

    this.level = level;
    this.texto = texto;
   }

   create () {
    this.cameras.main.setBackgroundColor("black");
    this.txtLevel = this.add.text(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 3, this.texto);
    this.txtLevel.setOrigin(0.5);

    this.time.addEvent({
      delay: 4000,
      callback: () => {
        this.scene.start(this.level)
      },
      callbackScope: this
    })
   }
}