<template>
  <ComboModal :cards-in-deck="cardsToDeck" />
  <Textarea
    id="scrollTo"
    v-model="rawDeckText"
    :rows="10"
    :autoResize="false"
    :placeholder="'Enter your deck:\nHeliod, Sun-Crowned\n1 Walking Ballista (2xm) 306'"
  />
  <DeckStat
    text="Combos"
    :number="comboStore.comboData.included.length"
    tooltip-message="Number of combos found in the deck"
  />
  <DeckStat
    text="Unique Cards"
    :number="uniqueCards.length"
    tooltip-message="Number of cards in at least one combo in the deck"
  />
  <h2>Combos in Deck</h2>
  <ComboList
    :combos="comboStore.comboData.included"
    :cards-in-deck="cardsToDeck"
  />
  <h2>Close Combos</h2>
  <CloseComboData :cards-in-deck="cardsToDeck" />
  <ComboList
    :combos="comboStore.comboData.almostIncluded"
    :cards-in-deck="cardsToDeck"
  />
</template>

<script lang="ts" setup>
import Textarea from "primevue/textarea";
import ComboList from "@/components/combo/ComboList.vue";
import CloseComboData from "@/components/combo/CloseComboData.vue";
import ComboModal from "@/components/ComboModal.vue";
import DeckStat from "@/components/combo/DeckStat.vue";
import { ref, computed, watchEffect, onMounted } from "vue";
import loadPriceData from "@/lib/getData/getPriceData";
import loadSymbolData from "@/lib/getData/getSymbolData";
import normalizeCardName from "@/lib/normalizeCard";
import getComboData from "@/lib/getData/getComboData";
import comboStore from "@/store/combos";

const rawDeckText = ref("");

onMounted(() => {
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

const uniqueCards = computed(() => {
  let cards: string[] = [];
  for (const combo of comboStore.comboData.included) {
    cards = [
      ...cards,
      ...combo.uses.map((e) => normalizeCardName(e.card.name)),
    ];
  }
  return [...new Set(cards)];
});

watchEffect(() => {
  getComboData(cardsToDeck.value);
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
.stat {
  cursor: auto;
  margin-top: var(--space-small);
  margin-right: calc(var(--space-small) / 2);
}

.p-tooltip {
  padding-left: 3em;
}
</style>
