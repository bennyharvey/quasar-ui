<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import RouterLink from 'src/components/RouterLink.vue';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const linksList = [
  {
    title: 'Socket',
    caption: 'testing',
    icon: 'school',
    link: 'game',
  },
  {
    title: 'Index',
    caption: 'game is here',
    icon: 'code',
    link: '',
  },
];

const leftDrawerOpen = ref(false);
const version = ref('0.1.2');
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const { locale } = useI18n({ useScope: 'global' });
const localeOptions = [
  { value: 'en-US', label: 'English' },
  { value: 'ru', label: 'Русский' },
];
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-btn flat dense round icon="dark_mode" aria-label="Dark Mode Toggle" @click="$q.dark.toggle()" />
        <q-toolbar-title> {{ $t('app.name') }} </q-toolbar-title>
        <q-select
          v-model="locale"
          :options="localeOptions"
          label="Language"
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
        />
        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :show-if-above="false" bordered>
      <q-list>
        <q-item-label header> Routes </q-item-label>
        <RouterLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
