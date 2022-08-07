<script lang="ts" setup>
import { ref } from 'vue';
import BasicPendulum from './BasicPendulum.vue';
const props = defineProps({
  playerId: String,
  playerName: String,
  value: Number,
  f: Boolean,
});

console.log(props.playerName);
</script>

<template>
  <p>{{ playerName }} {{ value }}</p>
  <BasicPendulum :canvas-id="props.playerId" :influence-value="props.value" :f="f" />
</template>
