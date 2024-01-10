<template>
  <Message v-if="comboStore.isError" severity="error" :closable="false"
    >An Error Occurred</Message
  >
  <SpinLoader v-else-if="!comboStore.isLoaded" size="3em" />
  <Message v-else-if="cardsInDeck.length < 1" severity="warn" :closable="false"
    >Your Deck Is Empty</Message
  >
  <Message v-else-if="combos.length < 1" severity="info" :closable="false"
    >No Combos Found</Message
  >
  <div v-else class="card-container">
    <DeferredContent v-for="(combo, index) in sort(combos)" :key="index">
      <Card>
        <template #header v-if="headerImage(combo)">
          <img :src="headerImage(combo)" :alt="combo.uses[0].card.name" />
        </template>
        <template #content>
          <div class="link-container">
            <CardLink
              v-for="(card, i) in combo.uses"
              :key="i"
              :name="card.card.name"
              :is-in-deck="cardsInDeck.includes(card.card.name)"
            />
          </div>
          <div v-if="preferences.showManaValue">
            <SymbolText :text="combo.manaNeeded" />
          </div>
          <div v-if="preferences.showComboPrice">
            {{ formatComboPrice(combo) }}
          </div>
          <ul>
            <li v-for="(produce, i) in combo.produces" :key="i">
              {{ produce.name }}
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
import Button from "primevue/button";
import Message from "primevue/message";
import CardLink from "./CardLink.vue";
import SymbolText from "./SymbolText.vue";
import SpinLoader from "@/components/utility/SpinLoader.vue";
import type { Combo } from "@/lib/types";
import normalizeCardName from "@/lib/normalizeCard";
import comboStore from "@/store/combos";
import preferences from "@/store/preferences";
import priceStore from "@/store/price";
defineProps<{ combos: Combo[]; cardsInDeck: string[] }>();

const sort = (combos: Combo[]): Combo[] => {
  if (preferences.sortMethod === "Unsorted") {
    return combos;
  } else if (preferences.sortMethod === "Price") {
    return [...combos].sort((a, b) => getPrice(a) - getPrice(b));
  } else if (preferences.sortMethod === "Price Dec") {
    return [...combos].sort((a, b) => getPrice(b) - getPrice(a));
  }
  return combos;
};

const headerImage = (combo: Combo) => {
  return `https://api.scryfall.com/cards/named?format=image&version=art_crop&exact=${encodeURI(
    combo.uses[0].card.name
  )}`;
};

const openModal = (combo: Combo) => {
  comboStore.comboModal = combo;
  comboStore.showComboModal = true;
};

const getPrice = (combo: Combo): number => {
  let price = 0;
  for (const { card } of combo.uses) {
    const prices = priceStore.price[normalizeCardName(card.name)];
    const cardPrice = Number(prices[preferences.store]?.price);
    price += isNaN(cardPrice) ? 0 : cardPrice;
  }
  return price;
};

const formatComboPrice = (combo: Combo): string => {
  return getPrice(combo).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
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
  width: 100%;
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

ul {
  margin-bottom: 0;
}
img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  object-position: center;
}
</style>
