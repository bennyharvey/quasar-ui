<script lang="ts" setup>
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';
import HomeostatModule from 'src/components/HomeostatModule.vue';
import PhaserContainer from 'src/components/PhaserContainer.vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);
const meta = ref<Meta>({
  totalCount: 1200,
});
</script>

<template>
  <q-page class="row justify-start">
    <Suspense>
      <PhaserContainer />

      <template #fallback>
        <div class="placeholder">Loading ...</div>
      </template>
    </Suspense>
    <!-- <HomeostatModule /> -->
    <!-- <ExampleComponent
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    /> -->
  </q-page>
</template>

<style lang="scss">
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
