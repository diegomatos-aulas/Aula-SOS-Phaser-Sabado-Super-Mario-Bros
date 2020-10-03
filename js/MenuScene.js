export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  init() {
    const { width, height } = this.sys.game.canvas;
    this.GAME_WIDTH = width;
    this.GAME_HEIGHT = height;
  }

  create() {
    // Cria um tilemap a partir do JSON
    this.tilemapMenu = this.add.tilemap("menu");

    // Linka o tilemap com a imagem (tileset)
    // addTilesetImage(nomeDoTilesetDentroDoTILED, imagemCarregadoNoPhaser)
    this.tileset = this.tilemapMenu.addTilesetImage("mariotileset", "tileset");

    // Cria a camada referente dentro do TILED
    // createStaticLayer(nomeDaCamadaDentroDoTILED, tileset)
    this.camadaPrincipal = this.tilemapMenu.createStaticLayer(
      "principal",
      this.tileset
    );

    this.jogador = this.add.sprite(48, 200, "Mario Pequeno");

    this.banner = this.add.image(
      this.GAME_WIDTH / 2,
      this.GAME_HEIGHT / 4,
      "menuBanner"
    );
    this.banner.setScale(0.23);

    this.marioOpcao = this.add.text(
      this.GAME_WIDTH / 2 - 30,
      this.GAME_HEIGHT / 2,
      "Jogar com o Mario",
      { fontFamily: "Source Code Pro", fontSize: "12px" }
    );
    this.marioOpcao.setOrigin(0, 0.5);

    this.luigiOpcao = this.add.text(
      this.GAME_WIDTH / 2 - 30,
      this.GAME_HEIGHT / 2 + 16,
      "Jogar com o Luigi",
      { fontFamily: "Source Code Pro", fontSize: "12px" }
    );
    this.luigiOpcao.setOrigin(0, 0.5);

    let enterKey = this.input.keyboard.addKey("ENTER");
    enterKey.on(
      "down",
      () => {
        this.scene.start("Level1");
      },
      this
    );
  }
}
