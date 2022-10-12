<script lang="ts">
export default {
  name: "ComboList",
};
</script>

<template>
  <div class="card-container">
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
import CardLink from "./CardLink.vue";
import type { Combo } from "@/lib/types";
import getCard from "@/lib/getCard";
import comboStore from "@/store/combos";
defineProps<{ combos: Combo[] }>();

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
