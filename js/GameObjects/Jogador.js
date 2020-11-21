export default class Jogador extends Phaser.Physics.Arcade.Sprite {
  constructor(x, y, cena, jogador, tamanho, stance){
    super(cena, x, y, `${jogador} ${tamanho}`);

    cena.add.existing(this);
    cena.physics.add.existing(this);

    this.setGravity(0, 1200);
    this.setCollideWorldBounds(true);

    this.velocidade = {
      x: 100,
      y: 420
    }

    this.state = {
      jogador,
      tamanho,
      stance
    }

    this.hasJumped = false;
  }

  update(cursor){
    this.movimentacaoDoJogador(cursor);
    this.animacaoDoJogador();
  }

  movimentacaoDoJogador(cursor){
    // this.setVelocityX(0);

    if (cursor.right.isDown){
      this.setVelocityX(this.velocidade.x);
      this.flipX = false;

      if (!this.hasJumped) {
        this.state.stance = "Walking";
      }          
    }
    else if (cursor.left.isDown){
      this.setVelocityX(-this.velocidade.x);
      this.flipX = true;

      if (!this.hasJumped) {
        this.state.stance = "Walking";
      }      
    }

    // console.log(cursor.up.isDown && !this.hasJumped && (this.body.onFloor() || this.body.touching.down))
    if (cursor.up.isDown && !this.hasJumped && (this.body.onFloor() || this.body.touching.down)) {
      this.setVelocityY(-this.velocidade.y);
      this.state.stance = "Jump";
      this.hasJumped = true;
    }

    if (cursor.up.isUp && this.body.velocity.y === 0 && (this.body.onFloor() || this.body.touching.down)){
      this.hasJumped = false;
    }


    if (cursor.right.isUp && cursor.left.isUp){
      this.setVelocityX(0);
      if (!this.hasJumped) {
        this.state.stance = "Idle";
      }
    }
  }

  animacaoDoJogador(){
    const {jogador, tamanho, stance} = this.state;
    

    this.anims.play(`${jogador} ${tamanho} ${stance}`, true);
    this.body.setSize();
  }
}