<template>
  <header class="header-container">
    <Card>
      <template #title>
        <h1>EDH Deck Check</h1>
      </template>
      <template #subtitle>
        <p class="subheading">
          Paste in your deck and find the many combos within and combos that
          could be added just missing one card.
        </p>
        <p class="subheading">
          EDH Deck Check no longer works online. Instead, you may copy the
          source and use local host to view the website.
        </p>
      </template>
      <template #content>
        <Button label="Get Started" @click="scroll()" class="primary-button" />
        <Button
          @click="() => (preferences.isSidebarOpen = true)"
          label="Settings"
          class="setting-button p-button-outlined"
          icon="pi pi-cog"
        />
      </template>
    </Card>
    <img src="/header.png" alt="header" />
  </header>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import Card from "primevue/card";
import preferences from "@/store/preferences";
const scroll = () =>
  window.scroll({
    top: document.documentElement.clientHeight,
    left: 0,
    behavior: "smooth",
  });
</script>

<style scoped>
.primary-button {
  margin-right: calc(var(--space-small) / 2);
}
.header-container {
  display: flex;
  margin-bottom: var(--space-large);
  flex-direction: row;
  height: 100vh;
}
h1 {
  margin: 0;
}
.subheading {
  font-size: 1.1em;
  max-width: 50ch;
  display: block;
}
.p-card {
  border-radius: 0;
  width: 50%;
  box-shadow: none;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  width: 50%;
  object-fit: cover;
  object-position: 75%;
  filter: hue-rotate(-95deg);
}

@media only screen and (max-width: 768px) {
  .header-container {
    flex-direction: column-reverse;
  }
  .p-card,
  img {
    width: 100%;
  }
}
</style>
