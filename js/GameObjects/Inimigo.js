export default class Inimigo extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, textura){
    super(scene, x, y, textura)

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.direcao = -1; // ou -1
    this.velocidade = {
      x: 30
    }
    this.canWalk = false;
    this.inSight = false;
  }

  update(){
    let distancia = this.x - this.scene.jogador.x;
    if (distancia < 120 && !this.inSight){
      console.log("FOI")
      this.inSight = true;
      this.canWalk = true;
    }

    if(this.canWalk) this.movimentacaoDoJogador()
    else this.setVelocityX(0)
  }

  movimentacaoDoJogador(){
    this.verificarSeTemParede();
    if (this.direcao === 1) {
      this.setVelocityX(this.velocidade.x);
    } else if (this.direcao === -1) {
      this.setVelocityX(-this.velocidade.x);
    }
  }

  verificarSeTemParede(){
    if (this.body.onWall()) this.direcao *= -1;
  }
}