import Jogador from "./GameObjects/Jogador.js"
import Inimigo from "./GameObjects/Inimigo.js"

export default class Level1 extends Phaser.Scene{
  constructor(){
    super("Level1")
  }

  init() {
    const { width, height } = this.sys.game.canvas;
    this.GAME_WIDTH = width;
    this.GAME_HEIGHT = height;
  }

  create(){
    // Redefinindo as bordas do mundo
    this.physics.world.setBounds(0, 0, 3584, 272);

    // Tilemap
    this.map = this.add.tilemap("level1");
    this.tileset = this.map.addTilesetImage('mariotileset', 'tileset');

    this.fundo = this.map.createDynamicLayer("fundo", this.tileset);
    this.world = this.map.createDynamicLayer("world", this.tileset);
    this.world.setCollisionByProperty({collide : true});

    // Jogador
    this.jogador = new Jogador(150, this.GAME_HEIGHT - 40, this, "Mario", "Pequeno", "Idle");

    this.inimigos = this.add.group();
    this.world.forEachTile(criarInimigo.bind(this));

    function criarInimigo(tile) {
      if (tile.index === 64) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let littleGomba = new Inimigo(this, x, y, "LittleGomba");
        littleGomba.anims.play("Little Gomba Walking");
        this.inimigos.add(littleGomba);

        this.world.removeTileAt(tile.x, tile.y);
      }

      if (tile.index === 65) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let koopaTroopa = new Inimigo(this, x, y - 4, "KoopaTroopa");
        koopaTroopa.anims.play("Koopa Troopa Walking");
        this.inimigos.add(koopaTroopa)

        this.world.removeTileAt(tile.x, tile.y); 
      }
    }

    this.blocosInterativos = this.add.group();
    this.tijolos = this.add.group();

    this.world.forEachTile(criarBlocos.bind(this));

    function criarBlocos(tile) {
      if (tile.index === 2) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let tijolo = this.physics.add.sprite(x, y, "brick");
        tijolo.setImmovable();

        this.tijolos.add(tijolo);

        this.world.removeTileAt(tile.x, tile.y);
      }

      if (tile.index === 25) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let blocoInterativo = this.physics.add.sprite(x, y, "surpriseBlock");
        blocoInterativo.anims.play("Surprise Block Ativo")
        blocoInterativo.canDrop = true;
        blocoInterativo.setImmovable();
        
        this.blocosInterativos.add(blocoInterativo)

        this.world.removeTileAt(tile.x, tile.y); 
      }
    }

    // Cursor
    this.cursor = this.input.keyboard.createCursorKeys();

    // Items Coletáveis
    this.itensColetaveis = this.add.group();

    // HUD
    this.pontuacao = 0;
    this.moedasColetadas = 0;

    this.txtPontuacao = this.add.text(0, 0, `Pontuação: ${this.pontuacao}`, {fontSize: "12px"}).setScrollFactor(0);
    this.txtMoedasColetadas = this.add.text(0, 16, `Moedas Coletadas: ${this.moedasColetadas}`, {fontSize: "12px"}).setScrollFactor(0)

    // Camera
    this.cameras.main.startFollow(this.jogador, true);
    this.cameras.main.setBounds(0, 0, 3584, 240);

    // Físicas
    this.physics.add.collider(this.jogador, this.world);
    this.physics.add.collider(this.jogador, this.tijolos, this.colisaoComOsTijolos, null, this);
    this.physics.add.collider(this.jogador, this.blocosInterativos, this.colisaoComOsBlocosInterativos, null, this);

    this.physics.add.collider(this.inimigos, this.world);
    this.physics.add.collider(this.inimigos, this.tijolos);
    this.physics.add.collider(this.inimigos, this.blocosInterativos);

    this.physics.add.collider(this.itensColetaveis, this.world);
    this.physics.add.collider(this.itensColetaveis, this.tijolos);
    this.physics.add.collider(this.itensColetaveis, this.blocosInterativos);
  }

  update(){
    this.jogador.update(this.cursor);

    // Ou iterate
    this.inimigos.children.each(inimigo => {
      inimigo.update();
    })
  }

  colisaoComOsTijolos(jogador, tijolo){
    if(jogador.y - (jogador.displayHeight/2) >= tijolo.y + (tijolo.displayHeight/2)){
      this.animarObjeto(tijolo, tijolo.displayHeight/2, null);
    }
  }

  colisaoComOsBlocosInterativos(jogador, bloco){
    if(jogador.y - (jogador.displayHeight/2) >= bloco.y + (bloco.displayHeight/2) && bloco.canDrop){
      bloco.canDrop = false;
      this.animarObjeto(bloco, bloco.displayHeight/2, () => {
        bloco.anims.play("Surprise Block Inativo")
      });

      let sorteio = Math.round(Math.random() * 100)

      if (sorteio < 1) {
        let moeda = this.add.sprite(bloco.x, bloco.y - bloco.displayHeight, "coin");
        moeda.valor = 200;

        this.animarObjeto(moeda, moeda.displayHeight, () => {
          // console.log("Ganhou moedas")
          this.addPontuacao(moeda.valor);
          this.moedasColetadas += 1;
          this.txtMoedasColetadas.setText(`Moedas Coletadas: ${this.moedasColetadas}`)
        });
      } else {
        let cogumelo = this.physics.add.sprite(bloco.x, bloco.y - bloco.displayHeight, "magicMushroom");
        cogumelo.setGravityY(1200);

        this.animarObjeto(cogumelo, cogumelo.displayHeight, null);

        this.itensColetaveis.add(cogumelo)
      }
     }
  }

  animarObjeto(objeto, distancia, onCompleteFn){
    this.tweens.add({
      targets : objeto,
      y : objeto.y - distancia,
      ease : "Cubic",
      duration : 150, // ms
      onComplete : onCompleteFn,
      yoyo : true
    }) 
  }

  addPontuacao(pontos){
    this.pontuacao += pontos;
    this.txtPontuacao.setText(`Pontuação: ${this.pontuacao}`)
  }
}