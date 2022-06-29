import { Scene } from 'phaser';

export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  create() {
    this.add.image(400, 300, 'sky');

    const bomb = this.physics.add.image(400, 100, 'bomb');
    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.setBounce(1);
    bomb.setVelocity(200, 20);

    this.sound.add('thud');
    this.physics.world.on('worldbounds', () => {
      this.sound.play('thud', { volume: 0.75 });
    });

    // this.scale.on('resize', this.resize, this);
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    var width = gameSize.width;
    var height = gameSize.height;
    this.cameras.resize(width, height);
  }

  update() {
    //
  }
}
