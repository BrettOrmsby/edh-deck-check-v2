<script setup lang="ts">
import DeckCheck from "./components/DeckCheck.vue";
import HeaderMessage from "./components/HeaderMessage.vue";
import SideBar from "./components/SideBar.vue";
import FooterLegal from "./components/FooterLegal.vue";
</script>

<template>
  <HeaderMessage />
  <div class="container">
    <DeckCheck />
    <SideBar />
  </div>
  <FooterLegal />
</template>

<style scoped>
.container {
  margin: var(--space-small) var(--space-medium);
}
</style>
