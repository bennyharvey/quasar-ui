import { Scene } from 'phaser';
import sky from '../assets/sky.png';
import bomb from '../assets/bomb.png';
import thudMp3 from '../assets/thud.mp3';
import thudOgg from '../assets/thud.ogg';

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('sky', sky);
    this.load.image('bomb', bomb);
    this.load.audio('thud', [thudMp3, thudOgg]);
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    var width = gameSize.width;
    var height = gameSize.height;
    this.cameras.resize(width, height);
  }
  create() {
    // this.scale.on('resize', this.resize, this);
    this.scene.start('PlayScene');
  }
}
