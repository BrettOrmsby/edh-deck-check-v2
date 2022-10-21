<script lang="ts">
export default {
  name: "DeckCheck",
};
</script>

<template>
  <Textarea
    id="scrollTo"
    v-model="rawDeckText"
    :rows="10"
    :autoResize="false"
    :placeholder="'Enter your deck:\nHeliod, Sun-Crowned\n1 Walking Ballista (2xm) 306'"
  />
  <Panel
    v-if="unfoundCards.length > 0"
    :toggleable="true"
    header="Cards Not Found"
    style="margin-top: var(--space-small)"
  >
    <p>
      Here are the cards that have not been found due to their spelling,
      legality or other issues:
    </p>
    <ul>
      <li v-for="(card, index) in unfoundCards" :key="index">{{ card }}</li>
    </ul>
  </Panel>
  <h2>Combos in Deck</h2>
  <ComboList :combos="comboStore.combosInDeck" :cards-in-deck="cardsToDeck" />
  <h2>Close Combos</h2>
  <CloseComboData />
  <ComboList :combos="comboStore.closeCombos" :cards-in-deck="cardsToDeck" />
</template>

<script lang="ts" setup>
import Textarea from "primevue/textarea";
import Panel from "primevue/panel";
import ComboList from "@/components/combo/ComboList.vue";
import CloseComboData from "@/components/combo/CloseComboData.vue";
import { ref, computed, watchEffect, onMounted } from "vue";
import loadComboData from "@/lib/getData/getComboData";
import loadCardData from "@/lib/getData/getCardData";
import loadPriceData from "@/lib/getData/getPriceData";
import loadSymbolData from "@/lib/getData/getSymbolData";
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
  loadPriceData();
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
  comboStore.closeCombos = almostCombosInDeck;
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
textarea {
  width: 75vw;
  margin: 0 auto;
}
</style>
