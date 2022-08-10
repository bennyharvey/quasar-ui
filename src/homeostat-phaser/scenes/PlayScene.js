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
    bomb.setVelocity(100, 20);

    const bomb1 = this.physics.add.image(400, 100, 'bomb');
    bomb1.setCollideWorldBounds(true);
    bomb1.body.onWorldBounds = true; // enable worldbounds collision event
    bomb1.setBounce(1);
    bomb1.setVelocity(70, 30);

    const bomb2 = this.physics.add.image(400, 100, 'bomb');
    bomb2.setCollideWorldBounds(true);
    bomb2.body.onWorldBounds = true; // enable worldbounds collision event
    bomb2.setBounce(1);
    bomb2.setVelocity(160, 40);

    const bomb3 = this.physics.add.image(400, 100, 'bomb');
    bomb3.setCollideWorldBounds(true);
    bomb3.body.onWorldBounds = true; // enable worldbounds collision event
    bomb3.setBounce(1);
    bomb3.setVelocity(220, 50);

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
