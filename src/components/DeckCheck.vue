<script lang="ts">
export default {
  name: "DeckCheck",
};
</script>

<template>
  <Card>
    <template #content>
      <Textarea
        v-model="rawDeckText"
        :rows="10"
        :autoResize="false"
        :placeholder="'Enter your deck'"
      />
    </template>
  </Card>
  <h2>Combos in Deck</h2>
  <ComboList :combos="comboStore.combosInDeck" />
  <h2>Combos Almost in Deck</h2>
  <ComboList :combos="comboStore.almostCombosInDeck" />
</template>

<script lang="ts" setup>
import Textarea from "primevue/textarea";
import Card from "primevue/card";
import ComboList from "@/components/combo/ComboList.vue";
import { ref, computed, watchEffect, onMounted } from "vue";
import loadComboData from "@/lib/getComboData";
import loadCardData from "@/lib/getCardData";
import loadSymbolData from "@/lib/getSymbolData";
import getCard from "@/lib/getCard";
import normalizeCardName from "@/lib/normalizeCard";
import comboStore from "@/store/combos";
import cardStore from "@/store/cards";
import type { Combo } from "@/lib/types";

const rawDeckText = ref("");
const unfoundCards = ref<string[]>([]);

onMounted(() => {
  loadComboData();
  loadCardData();
  loadSymbolData();
});

const cardsToDeck = computed(() => {
  // support for pasting from MoxField
  const onlyInDeck = rawDeckText.value.split("SIDEBOARD:")[0];
  const cards: string[] = [];
  for (let card of onlyInDeck.split("\n")) {
    card = card.trim();
    if (!card) {
      continue;
    }
    let match = card.match(/^\s*(?:\d+(?:x|X)?)?\s*([\s\S]*?)([(*][\s\S]*?)?$/);

    if (match && match[1]) {
      cards.push(match[1].trim());
    }
  }
  return cards;
});

const findCombos = () => {
  const deck = cardsToDeck.value;
  const normalizedDeck = deck.map((e) => normalizeCardName(e));
  let identity: string[] = [];
  const almostCombosInDeck: Combo[] = [];
  const combosInDeck: Combo[] = [];
  let cardsNotInDeck: string[] = [];
  unfoundCards.value = [];
  for (let cardName of deck) {
    const card = getCard(cardName);
    if (!card) {
      unfoundCards.value.push(cardName);
      continue;
    }

    const cardIdentity = card.colourId;
    identity = [...new Set([...identity, ...cardIdentity])];
  }
  identity = identity.map((e) => e.toLowerCase());
  main: for (let combo of comboStore.combos) {
    for (let colour of combo.identity.split(",")) {
      if (colour !== "c" && !identity.includes(colour)) {
        continue main;
      }
    }
    let numberCardsNotInDeck = 0;
    let tempCardsNotInDeck = [];
    for (let card of combo.cards) {
      if (!normalizedDeck.includes(normalizeCardName(card))) {
        numberCardsNotInDeck += 1;
        tempCardsNotInDeck.push(card);
        if (numberCardsNotInDeck > 1) {
          continue main;
        }
      }
    }
    cardsNotInDeck = [...new Set([...cardsNotInDeck, ...tempCardsNotInDeck])];
    if (numberCardsNotInDeck === 1) {
      almostCombosInDeck.push(combo);
    } else {
      combosInDeck.push(combo);
    }
  }
  comboStore.almostCombosInDeck = almostCombosInDeck;
  comboStore.combosInDeck = combosInDeck;
  cardStore.cardsNotInDeck = cardsNotInDeck;
};

watchEffect(() => {
  if (cardStore.isLoaded && comboStore.isLoaded) {
    cardsToDeck;
    findCombos();
  }
});
</script>

<style scoped>
.p-inputtextarea {
  margin: 0 auto;
  display: block;
  resize: none;
  width: 100%;
}
.p-card {
  width: 75vw;
  margin: 0 auto;
}
</style>