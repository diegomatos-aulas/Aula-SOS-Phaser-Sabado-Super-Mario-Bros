import BootScene from "./BootScene.js"
import LoadScene from "./LoadScene.js"
import MenuScene from "./MenuScene.js"
import Level1 from "./Level1.js"

const config = {
  width: 240,
  height: 240,
  type: Phaser.AUTO, // CANVAS ou WebGL
  physics: {
    default: "arcade",
/*     arcade: {
      gravity: { y: 0}
    } */
  },
  backgroundColor: "#5c74fc", // Cor Azul
  pixelArt : true,
  scene : [BootScene, LoadScene, MenuScene, Level1],
  scale: {
    mode : Phaser.Scale.FIT, // "Preencher" o container Pai o máximo possível
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

new Phaser.Game(config);