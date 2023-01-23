<script setup>
import { onMounted, ref } from 'vue';
import PlayerStats from './PlayerStats.vue';
import BasicPendulum from './BasicPendulum.vue';

const props = defineProps({
  data: Object,
  f: Boolean,
});
</script>

<template>
  <br />
  {{ props.data }}
  <PlayerStats v-for="player in props.data" :key="player.playerId" v-bind="player" :f="f" />
</template>

<style>
canvas {
  border: 1px solid black;
}
</style>
