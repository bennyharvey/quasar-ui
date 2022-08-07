<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, onUpdated, ref, watch } from 'vue';
import { useMainStore } from 'stores/main-store';
const props = defineProps({
  canvasId: String,
  influenceValue: Number,
  f: Boolean,
});
// let delay = computed(() => {
//   return 1000 / props.influenceValue;
// });
let delay = ref(50);
const store = useMainStore();

let a = Math.PI / 2; // starting phase
let w0 = computed(() => {
  return Math.abs(props.influenceValue - 12) ** 0.3 / 20;
}); // frequency
let A = 200; // amplitude
let t = ref(0);
const y = ref(0);
let ctx;
let tickLoopPtr;
const ff = computed(() => store.flipflop);
watch(ff, () => {
  console.log('flip flopped');
  t.value = 0;
});
function drawLine(y) {
  ctx.clearRect(0, 0, 400, 200);
  ctx.beginPath();
  ctx.rect(y + 200, 0, 1, 150);
  ctx.stroke();
}

function tick() {
  // FIXME: figure out this magick reset number
  // if (y.value == A) t.value = 0;
  if (t.value === Number.MAX_VALUE - 1) t.value = 0;
  t.value++;
  y.value = Math.round(A * Math.cos(w0.value * t.value + a));
  drawLine(y.value);
  // console.log(props.f);
}

onUpdated(() => {
  clearInterval(tickLoopPtr);
  tickLoopPtr = setInterval(() => {
    tick();
  }, delay.value);
});

onMounted(() => {
  const c = document.getElementById(props.canvasId);
  ctx = c.getContext('2d');
  tickLoopPtr = setInterval(() => {
    tick();
  }, delay.value);
});
</script>

<template>
  {{ y }} {{ t }} {{ w0 * 10 }}
  <br />
  <canvas :id="props.canvasId" width="400" height="150"></canvas>
</template>

<style>
canvas {
  border: 1px solid black;
}
</style>
