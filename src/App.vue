<script setup lang="ts">
import DeckCheck from "./components/DeckCheck.vue";
import ComboModal from "./components/ComboModal.vue";
import HeaderMessage from "./components/HeaderMessage.vue";
import FooterLegal from "./components/FooterLegal.vue";
</script>

<template>
  <HeaderMessage />
  <div class="container">
    <ComboModal />
    <DeckCheck />
  </div>
  <FooterLegal />
</template>

<style scoped>
.container {
  margin: var(--space-small) var(--space-medium);
}
</style>
