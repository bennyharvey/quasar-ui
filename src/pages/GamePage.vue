<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { io } from 'socket.io-client';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import GameStats from '../components/GameStats.vue';
const { t } = useI18n();
const $q = useQuasar();

const socket = io('http://localhost:50201');
const roomName = 'game1';
// const socketId = ref(socket);
const playerName = ref('');
const gameData = ref({ data: {} });

socket.on('connect', () => {
  console.log('Connected with id = ' + socket.id);
});
socket.on('announcements', (data) => {
  console.log('announcements: ');
  console.log(data);
});
socket.on('gameplay', (data) => {
  console.log('gameplay:');
  gameData.value = data;
  console.log(data);
});

function handleJoinButton() {
  if (playerName.value == '') {
    $q.notify({
      type: 'warning',
      message: t('warning.nameCantBeEmpty'),
    });
    return;
  }
  socket.emit('joinGame', { roomName: roomName, playerName: playerName.value });
}

function handleIncreaseButton() {
  socket.emit('increaseValue', { by: 1 });
}
</script>

<template>
  <div class="row">
    <div class="col">
      <p>{{ $t('greeting') }}</p>
      <q-input filled v-model="playerName" :label="$t('name')" />
      <q-btn push color="primary" :label="$t('join')" @click="handleJoinButton" />
      <q-btn push color="primary" label="+" @click="handleIncreaseButton" />
    </div>
    <div class="col"><GameStats :data="gameData.data" /></div>
  </div>
</template>

<style lang="scss"></style>
