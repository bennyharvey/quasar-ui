<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { io } from 'socket.io-client';
import { useQuasar } from 'quasar';
import QrcodeVue from 'qrcode.vue';

let gameInstance = null;
const containerId = 'game-container';
const game = await import(/* webpackChunkName: "homeostat-phaser" */ '../homeostat-phaser/game.js');
// const width = ref(window.innerWidth);
const width = ref(400);

const socket = io('http://192.168.109.75:50201');
const roomName = 'game1';
const socketId = ref(socket);
const playerName = ref('');
const moveRight = ref(false);
const $q = useQuasar();

onMounted(() => {
  nextTick(() => {
    gameInstance = game.launch(containerId, width.value, 300);
  });
  socket.on('connect', () => {
    console.log(socket.id);
  });
  socket.on('announcements', (data) => {
    console.log(data);
  });
  socket.on('gameplay', (data) => {
    ``;
    console.log(data);
  });

  $q.notify('Game initialised');
});

function handleJoinButton() {
  if (playerName.value == '') {
    $q.notify('Name can not be blank');
    return;
  }
  socket.emit('joinGame', { roomName: roomName, playerName: playerName.value });
}
function handleDecreaseButton() {
  gameInstance.scene.scenes[1].physics.start();
  socket.emit('increaseGaugeValue', { by: -1 });
  // gameInstance.scene.scenes[1].physics.start();

  // moveRight.value = true;
}
function handleIncreaseButton() {
  socket.emit('increaseGaugeValue', { by: 1 });
  // gameInstance.scene.scenes[1].physics.shutdown();

  // moveRight.value = true;
}

function increaseWidth() {
  width.value += 100;
  console.log(width.value);
  console.log(gameInstance);
  gameInstance.scene.scenes[1].physics.config.gravity = { y: 1600 };
  // gameInstance.scale.resize(width.value, 300);
  // gameInstance.scene.scenes[0].cameras.resize(width.value, 300);
  // gameInstance.scene.scenes[1].cameras.resize(width.value, 300);
  // gameInstance.scene.scenes[0].cameras.default.setViewport(0, 0, width.value, 300);
  // gameInstance.scene.scenes[1].cameras.default.setViewport(0, 0, width.value, 300);
  // gameInstance.scene.scenes[1].cameras.main.setViewport(0, 0, width.value, 300);
  // gameInstance.canvas.width = width.value;
}

onUnmounted(() => {
  gameInstance.destroy(false);
});
</script>

<template>
  <div class="col">
    <div :id="containerId" />
    <button @click="increaseWidth">width</button>
  </div>

  <div class="col">
    <q-input filled v-model="playerName" label="Player Name" />
    <q-btn push color="primary" label="Join room" @click="handleJoinButton" />
    <br />
    <q-btn push color="primary" label="Gauge a-" @click="handleDecreaseButton" />
    <q-btn push color="primary" label="Gauge a+" @click="handleIncreaseButton" />
    <br />
    <q-btn push color="primary" label="Gauge b-" @click="handleDecreaseButton" />
    <q-btn push color="primary" label="Gauge b+" @click="handleIncreaseButton" />
    <br />
    <q-btn push color="primary" label="Gauge c-" @click="handleDecreaseButton" />
    <q-btn push color="primary" label="Gauge c+" @click="handleIncreaseButton" />
    <br />
    <q-btn push color="primary" label="Gauge d-" @click="handleDecreaseButton" />
    <q-btn push color="primary" label="Gauge d+" @click="handleIncreaseButton" />
    <br />
    <br />
    <br />
    <qrcode-vue value="http://192.168.109.75:9000" :size="size" level="H" />
  </div>
</template>
