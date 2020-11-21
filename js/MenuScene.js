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

    this.opcaoEscolhida = 0;

    this.opcoes = [{
      nome : "Mario",
      y : this.GAME_HEIGHT / 2
    }, 
    {
      nome : "Luigi",
      y : this.GAME_HEIGHT / 2 + 16
    }];

    this.marioOpcao = this.add.text(
      this.GAME_WIDTH / 2 - 30,
      this.opcoes[0].y,
      "Jogar com o Mario",
      { fontFamily: "Source Code Pro", fontSize: "12px" }
    );
    this.marioOpcao.setOrigin(0, 0.5);

    this.luigiOpcao = this.add.text(
      this.GAME_WIDTH / 2 - 30,
      this.opcoes[1].y,
      "Jogar com o Luigi",
      { fontFamily: "Source Code Pro", fontSize: "12px" }
    );
    this.luigiOpcao.setOrigin(0, 0.5);

    this.ponteiro = this.add
      .image(this.marioOpcao.x - 10, this.marioOpcao.y, "menuPonteiro")
      .setScale(0.3);

      this.input.keyboard.addKey("DOWN").on("down", () => {
        this.opcaoEscolhida += 1;

        if (this.opcaoEscolhida > this.opcoes.length - 1) {
          this.opcaoEscolhida = 0;
        }

        this.ponteiro.y = this.opcoes[this.opcaoEscolhida].y
      });
      this.input.keyboard.addKey("UP").on("down", () => {
        this.opcaoEscolhida -= 1;

        if (this.opcaoEscolhida < 0) {
          this.opcaoEscolhida = this.opcoes.length - 1;
        }

        this.ponteiro.y = this.opcoes[this.opcaoEscolhida].y
      });

    let enterKey = this.input.keyboard.addKey("ENTER");
    enterKey.on(
      "down",
      () => {
        let data = {
          jogadorEscolhido: this.opcoes[this.opcaoEscolhida].nome,
        };
        this.scene.start("Level1", data);
      },
      this
    );
  }
}
