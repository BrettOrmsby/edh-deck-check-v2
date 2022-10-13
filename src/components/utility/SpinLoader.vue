<script lang="ts">
export default {
  name: "SpinLoader",
};
</script>

<template>
  <ProgressSpinner />
</template>

<script lang="ts" setup>
import ProgressSpinner from "primevue/progressspinner";
defineProps<{ size: string }>();
</script>

<style scoped>
.p-progress-spinner {
  width: v-bind(size);
  height: v-bind(size);
}
.p-progress-spinner:deep(.p-progress-spinner-circle) {
  stroke: var(--primary-400);
  -webkit-animation: p-progress-spinner-dash 1.5s ease-in-out infinite;
  animation: p-progress-spinner-dash 1.5s ease-in-out infinite;
}
</style>
