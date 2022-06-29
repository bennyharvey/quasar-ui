<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

let gameInstance = null;
const containerId = 'game-container';
const game = await import(/* webpackChunkName: "homeostat-phaser" */ '../homeostat-phaser/game.js');
// const width = ref(window.innerWidth);
const width = ref(400);

onMounted(() => {
  nextTick(() => {
    gameInstance = game.launch(containerId, width.value, 300);
  });
});

function increaseWidth() {
  width.value += 100;
  console.log(width.value);
  console.log(gameInstance);
  gameInstance.scale.resize(width.value, 300);
  gameInstance.scene.scenes[0].cameras.resize(width.value, 300);
  gameInstance.scene.scenes[1].cameras.resize(width.value, 300);
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
  <div :id="containerId" />
  <button @click="increaseWidth">width</button>
</template>
