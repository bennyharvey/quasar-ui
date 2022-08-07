<script lang="ts" setup>
import { ref } from 'vue';
console.log(process.env.VUE_APP_SOMEKEY);
</script>

<template>
  <p>{{ $t('greeting') }}</p>
</template>

<style lang="scss"></style>
