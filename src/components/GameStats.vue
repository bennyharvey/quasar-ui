<script setup>
import { onMounted, ref } from 'vue';
import PlayerStats from './PlayerStats.vue';

defineProps({
  data: Object,
});
let a = 0; // starting phase
let w0 = 0.1; // frequency
let y0 = 200; // amplitude
let t = 0;
const y = ref(0);

let ctx;

function drawLine(y) {
  ctx.clearRect(0, 0, 400, 200);
  ctx.beginPath();
  ctx.rect(y + 200, 0, 1, 150);
  ctx.stroke();
}
function tick() {
  if (y.value == y0) t = 0;
  t++;
  y.value = Math.round(y0 * Math.cos(w0 * t + a));
  drawLine(y.value);
}
setInterval(() => {
  tick();
}, 20);

onMounted(() => {
  const c = document.getElementById('pendulumCanvas');
  ctx = c.getContext('2d');
});
</script>

<template>
  {{ y }} {{ t }}
  <br />
  <canvas id="pendulumCanvas" width="400" height="150"></canvas>
  <PlayerStats v-for="player in data" :key="player.playerId" v-bind="player" />
</template>

<style>
canvas {
  border: 1px solid black;
}
</style>
