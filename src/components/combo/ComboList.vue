<script lang="ts">
export default {
  name: "ComboList",
};
</script>

<template>
  <Message
    v-if="comboStore.isError || cardStore.isError"
    severity="error"
    :closable="false"
    >An Error Occurred</Message
  >
  <SpinLoader
    v-else-if="!comboStore.isLoaded || !cardStore.isLoaded"
    size="3em"
  />
  <Message v-else-if="cardsInDeck.length < 1" severity="warn" :closable="false"
    >Your Deck Is Empty</Message
  >
  <Message v-else-if="combos.length < 1" severity="info" :closable="false"
    >No Combos Found</Message
  >
  <div v-else class="card-container">
    <DeferredContent v-for="(combo, index) in combos" :key="index">
      <Card>
        <template #header v-if="headerImage(combo)">
          <img :src="headerImage(combo)" :alt="combo.cards[0]" />
        </template>
        <template #content>
          <div class="link-container">
            <CardLink v-for="(card, i) in combo.cards" :key="i" :name="card" />
          </div>
          <ul>
            <li v-for="(result, i) in splitResult(combo.result)" :key="i">
              {{ result }}
            </li>
          </ul>
        </template>
        <template #footer>
          <Button icon="pi pi-eye" label="View" @click="openModal(combo)" />
          <a
            style="text-decoration: none"
            target="_blank"
            :href="`https://www.commanderspellbook.com/combo/${combo.id}/`"
            ><Button
              icon="pi pi-book"
              class="p-button-outlined"
              label="Spell Book"
          /></a>
        </template>
      </Card>
    </DeferredContent>
  </div>
</template>

<script lang="ts" setup>
import DeferredContent from "primevue/deferredcontent";
import Card from "primevue/card";
import Button from "primevue/Button";
import Message from "primevue/message";
import CardLink from "./CardLink.vue";
import SpinLoader from "@/components/utility/SpinLoader.vue";
import type { Combo } from "@/lib/types";
import getCard from "@/lib/getCard";
import comboStore from "@/store/combos";
import cardStore from "@/store/cards";
defineProps<{ combos: Combo[]; cardsInDeck: string[] }>();

const headerImage = (combo: Combo) => {
  return getCard(combo.cards[0])?.images.art;
};
const splitResult = (result: string): string[] => {
  return result.split(".").filter((e) => e.trim() !== "");
};
const openModal = (combo: Combo) => {
  comboStore.comboModal = combo;
  comboStore.showComboModal = true;
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  row-gap: var(--space-small);
  column-gap: var(--space-small);
}
.p-card {
  max-width: 300px;
  border-radius: var(--border-radius);
  overflow: hidden;
}
.link-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.p-button-outlined {
  margin-left: calc(var(--space-small) / 2);
}
</style>
