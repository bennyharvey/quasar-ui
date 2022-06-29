<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { io } from 'socket.io-client';
import 'phaser';
const socket = io('http://localhost:50201');
const roomName = 'game1';
const socketId = ref(socket);
const playerName = ref('');
const moveRight = ref(false);

let phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(phaserConfig);

function preload() {
  console.log('preload event fired');
  // this.load.setBaseURL('https://labs.phaser.io');
  // this.load.image('sky', 'assets/skies/space3.png');
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  // this.load.image('red', 'assets/particles/red.png');

  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
let platforms;
let player;
let cursors;

function create() {
  console.log('create event fired');
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();
  // this.add.image(400, 300, 'sky');

  // var particles = this.add.particles('red');

  // var emitter = particles.createEmitter({
  //   speed: 100,
  //   scale: { start: 1, end: 0 },
  //   blendMode: 'ADD',
  // });

  // var logo = this.physics.add.image(400, 100, 'logo');

  // logo.setVelocity(100, 200);
  // logo.setBounce(1, 1);
  // logo.setCollideWorldBounds(true);

  // emitter.startFollow(logo);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown || moveRight.value) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
socket.on('connect', () => {
  console.log(socket.id);
});
socket.on('announcements', (data) => {
  console.log(data);
});
socket.on('gameplay', (data) => {
  console.log(data);
});

const $q = useQuasar();
$q.notify('Some other messsage');

function handleJoinButton() {
  if (playerName.value == '') {
    alert('Name can not be blank');
    return;
  }
  socket.emit('joinGame', { roomName: roomName, playerName: playerName.value });
}

function handleIncreaseButton() {
  socket.emit('increaseValue', { by: 1 });
  moveRight.value = true;
}
</script>

<template>
  <div class="col">
    <p>{{ socketId.id }}</p>
  </div>
  <div class="col">
    <q-input filled v-model="playerName" label="Name" />
    <q-btn push color="primary" label="Join" @click="handleJoinButton" />
    <q-btn push color="primary" label="Increase value" @click="handleIncreaseButton" />
  </div>
</template>
