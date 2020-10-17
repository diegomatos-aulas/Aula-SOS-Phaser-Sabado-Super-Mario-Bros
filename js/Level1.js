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

    this.inimigos = this.add.group()
    this.world.forEachTile(criarInimigo.bind(this));

    function criarInimigo(tile) {
      if (tile.index === 64) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let littleGomba = new Inimigo(this, x, y, "LittleGomba");
        this.inimigos.add(littleGomba);

        this.world.removeTileAt(tile.x, tile.y);
      }

      if (tile.index === 65) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let koopaTroopa = new Inimigo(this, x, y - 4, "KoopaTroopa");
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
        // tijolo.setImmovable();

        this.tijolos.add(tijolo);

        this.world.removeTileAt(tile.x, tile.y);
      }

      if (tile.index === 25) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        let blocoInterativo = this.physics.add.sprite(x, y, "surpriseBlock");
        // blocoInterativo.setImmovable();
        
        this.blocosInterativos.add(blocoInterativo)

        this.world.removeTileAt(tile.x, tile.y); 
      }
    }

    // Cursor
    this.cursor = this.input.keyboard.createCursorKeys();

    // Camera
    this.cameras.main.startFollow(this.jogador, true);
    this.cameras.main.setBounds(0, 0, 3584, 240);

    // Físicas
    this.physics.add.collider(this.jogador, this.world);
    this.physics.add.collider(this.inimigos, this.world);
  }

  update(){
    this.jogador.update(this.cursor);

    this.inimigos.children.each(inimigo => {
      inimigo.update();
    })
  }
}