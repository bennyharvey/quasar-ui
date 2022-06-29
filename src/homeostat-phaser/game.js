import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import PlayScene from './scenes/PlayScene';

function launch(containerId, width, height) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: width,
    height: height,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false,
      },
    },
    // scale: {
    //   // mode: Phaser.Scale.RESIZE,
    //   // parent: 'phaser-example',
    //   width: width,
    //   height: height,
    // },
    scene: [BootScene, PlayScene],
  });
}

export default launch;
export { launch };
