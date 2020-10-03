import Jogador from "./GameObjects/Jogador.js"

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
    this.jogador = new Jogador(100, this.GAME_HEIGHT - 40, this, "Mario", "Pequeno", "Idle");

    // Cursor
    this.cursor = this.input.keyboard.createCursorKeys();

    // Camera
    this.cameras.main.startFollow(this.jogador, true);
    this.cameras.main.setBounds(0, 0, 3584, 240);

    // Físicas
    this.physics.add.collider(this.jogador, this.world);
  }

  update(){
    this.jogador.update(this.cursor);
  }
}