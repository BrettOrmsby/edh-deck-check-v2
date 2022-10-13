<script setup lang="ts">
import DeckCheck from "./components/DeckCheck.vue";
import ComboModal from "./components/ComboModal.vue";
</script>

<template>
  <div class="container">
    <h1>EDH Deck Check</h1>
    <ComboModal />
    <DeckCheck />
  </div>
</template>

<style scoped>
.container {
  margin: var(--space-small) var(--space-medium);
}
</style>
