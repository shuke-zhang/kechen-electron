<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
import { computed } from 'vue';
const sss = computed(() => 1 + 1);
const props = defineProps({});
console.log(props);
console.log(sss);
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
