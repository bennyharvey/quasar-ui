<script setup>
import { onMounted, ref } from 'vue';
import PlayerStats from './PlayerStats.vue';
import BasicPendulum from './BasicPendulum.vue';

defineProps({
  data: Object,
  f: Boolean,
});
</script>

<template>
  <br />
  <PlayerStats v-for="player in data" :key="player.playerId" v-bind="player" :f="f" />
</template>

<style>
canvas {
  border: 1px solid black;
}
</style>
