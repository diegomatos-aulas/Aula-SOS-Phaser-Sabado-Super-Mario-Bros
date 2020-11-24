export default class Jogador extends Phaser.Physics.Arcade.Sprite {
  constructor(x, y, cena, jogador, tamanho, stance){
    super(cena, x, y, `${jogador} ${tamanho}`);

    cena.add.existing(this);
    cena.physics.add.existing(this);

    this.setGravity(0, 1200);
    this.setCollideWorldBounds(true);
    this.setMaxVelocity(100, 420);

    this.velocidade = {
      x: 100,
      y: 420
    }

    this.atrito = 200;

    this.aceleracao = {
      x : 350,
      y : 210
    }

    this.state = {
      jogador,
      tamanho,
      stance
    }

    this.hasJumped = false;
  }

  update(cursor){
    this.animacaoDoJogador();

    if (!this.active) {
      return
    }

    this.movimentacaoDoJogador(cursor);
  }

  movimentacaoDoJogador(cursor){
    // this.setVelocityX(0);

    if (cursor.right.isDown){
      // this.setVelocityX(this.velocidade.x);
      this.setAccelerationX(this.aceleracao.x)
      this.flipX = false;

      if (!this.hasJumped && (this.body.onFloor() || this.body.touching.down)) {
        if (this.body.velocity.x < 0) {
          this.state.stance = "Changing Direction"
        } else{
          this.state.stance = "Walking";
        }
      }
    }
    else if (cursor.left.isDown){
      // this.setVelocityX(-this.velocidade.x);
      this.setAccelerationX(-this.aceleracao.x)
      this.flipX = true;

      if (!this.hasJumped && (this.body.onFloor() || this.body.touching.down)) {
        if (this.body.velocity.x > 0) {
          this.state.stance = "Changing Direction"
        } else{
          this.state.stance = "Walking";
        }
      }
    }

    // console.log(cursor.up.isDown && !this.hasJumped && (this.body.onFloor() || this.body.touching.down))
    if (cursor.up.isDown && !this.hasJumped && (this.body.onFloor() || this.body.touching.down)) {
      this.setVelocityY(-this.velocidade.y);
      this.state.stance = "Jump";
      this.hasJumped = true;

      if (this.state.tamanho === "Pequeno") {
        this.scene.jumpSmallSFX.play();
      } else if (this.state.tamanho === "Grande") {
        this.scene.jumpSuperSFX.play();
      }
    }

    if (cursor.up.isUp && this.body.velocity.y === 0 && (this.body.onFloor() || this.body.touching.down)){
      this.hasJumped = false;
    }


    if (cursor.right.isUp && cursor.left.isUp){
      // this.setVelocityX(0);
      this.setAccelerationX(0)
      this.setDragX(this.atrito)
      if (this.body.velocity.y === 0 && (this.body.onFloor() || this.body.touching.down)) {
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