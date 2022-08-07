<script lang="ts" setup>
import { ref } from 'vue';
defineProps({
  playerId: String,
  playerName: String,
  value: Number,
});
</script>

<template>
  <p>{{ playerName }} {{ value }}</p>
</template>
