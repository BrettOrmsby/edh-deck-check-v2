<template>
  <Dialog
    :header="header"
    v-model:visible="comboStore.showComboModal"
    style="max-width: 800px; width: 100%; margin: 0 2em"
    :modal="true"
    :draggable="false"
  >
    <h3>Cards</h3>
    <div class="cardsContainer">
      <CardImage
        v-for="(card, index) of comboStore.comboModal.uses"
        :key="index"
        :name="card.card.name"
        :is-in-deck="cardsInDeck.includes(card.card.name)"
      />
    </div>
    <h3>Prerequisites</h3>
    <ul>
      <li v-for="(item, index) in prerequisites" :key="index">
        <SymbolText :text="item" />
      </li>
    </ul>
    <h3>Steps</h3>
    <ol>
      <li
        v-for="(item, index) in formatParagraphToList(
          comboStore.comboModal.description
        )"
        :key="index"
      >
        <SymbolText :text="item" />
      </li>
    </ol>
    <h3>Result</h3>
    <ul>
      <li v-for="(item, index) in comboStore.comboModal.produces" :key="index">
        <SymbolText :text="item.name" />
      </li>
    </ul>
    <div class="footer">
      <a
        style="text-decoration: none"
        target="_blank"
        :href="`https://edhrec.com/combos/${edhrecLinkColour}/${comboStore.comboModal.id}`"
        ><Button icon="pi pi-chart-bar" label="EDHREC"
      /></a>
      <a
        style="text-decoration: none"
        target="_blank"
        :href="`https://www.commanderspellbook.com/combo/${comboStore.comboModal.id}/`"
        ><Button icon="pi pi-book" label="Commander Spell Book"
      /></a>
      <a
        style="text-decoration: none"
        target="_blank"
        :href="`https://commanderspellbook.com/report-error?comboId=${comboStore.comboModal.id}`"
        ><Button
          icon="pi pi-ban"
          label="Report a Problem"
          class="p-button-danger"
      /></a>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import CardImage from "@/components/combo/CardImage.vue";
import SymbolText from "@/components/combo/SymbolText.vue";
import { computed } from "vue";
import comboStore from "@/store/combos";

defineProps<{ cardsInDeck: string[] }>();

const header = computed(() => {
  const main = [...comboStore.comboModal.uses]
    .splice(0, 2)
    .map((e) => e.card.name)
    .join(" | ");
  if (comboStore.comboModal.uses.length > 2) {
    let plus = comboStore.comboModal.uses.length - 2;
    return `${main} | + ${plus} More`;
  }
  return main;
});

const prerequisites = computed(() => {
  const zones: Record<string, string[]> = {
    B: [],
    H: [],
    G: [],
    E: [],
    C: [],
    L: [],
  };
  const cards = comboStore.comboModal.uses;
  cards.forEach((card) => zones[card.zoneLocations[0]].push(card.card.name));

  let prerequisites: string[] = [];

  if (zones.C.length) {
    prerequisites.push(
      formatArrayToTextList(zones.C) + " in the command zone."
    );
  }
  if (zones.G.length) {
    prerequisites.push(formatArrayToTextList(zones.G) + " in the graveyard.");
  }
  if (zones.E.length) {
    prerequisites.push(formatArrayToTextList(zones.E) + " exiled.");
  }
  if (zones.H.length) {
    prerequisites.push(formatArrayToTextList(zones.H) + " in your hand.");
  }
  if (zones.L.length) {
    prerequisites.push(formatArrayToTextList(zones.L) + " in your library.");
  }
  if (zones.B.length) {
    prerequisites.push(formatArrayToTextList(zones.B) + " on the battlefield.");
  }

  return [
    ...prerequisites,
    ...formatParagraphToList(comboStore.comboModal.otherPrerequisites),
  ];
});

const formatArrayToTextList = (array: string[]) => {
  if (array.length === 1) {
    return array[0];
  }
  if (array.length === 2) {
    return array[0] + " and " + array[1];
  }
  const lastElement = array.pop();
  return array.join(", ") + ", and " + lastElement;
};

const formatParagraphToList = (text: string) => {
  if (!text) {
    return [];
  }
  return text
    .trim()
    .split(/(?<=\.)(?!$)/g)
    .filter((e) => e);
};

const edhrecLinkColour = computed(() => {
  const comboIdentity = comboStore.comboModal.identity
    .toLowerCase()
    .split("")
    .sort();
  const colourCombos = [
    ["c"],
    ["w"],
    ["u"],
    ["b"],
    ["r"],
    ["g"],
    ["w", "u"],
    ["u", "b"],
    ["b", "r"],
    ["r", "g"],
    ["g", "w"],
    ["w", "b"],
    ["u", "r"],
    ["b", "g"],
    ["r", "w"],
    ["g", "u"],
    ["w", "u", "b"],
    ["u", "b", "r"],
    ["b", "r", "g"],
    ["r", "g", "w"],
    ["g", "w", "u"],
    ["w", "b", "g"],
    ["u", "r", "w"],
    ["b", "g", "u"],
    ["r", "w", "b"],
    ["g", "u", "r"],
    ["w", "u", "b", "r"],
    ["u", "b", "r", "g"],
    ["b", "r", "g", "w"],
    ["r", "g", "w", "u"],
    ["g", "w", "u", "b"],
    ["w", "u", "b", "r", "g"],
  ];

  return colourCombos
    .find((e) => {
      const colourCombo = [...e].sort();
      return (
        colourCombo.length === comboIdentity.length &&
        comboIdentity.every((val, index) => val === colourCombo[index])
      );
    })
    ?.join("");
});
</script>

<style scoped>
h3:first-of-type {
  margin-top: 0;
}
.cardsContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: var(--space-small);
  column-gap: var(--space-small);
}
.footer {
  display: flex;
  flex-wrap: wrap;
  row-gap: var(--space-small);
  column-gap: var(--space-small);
  justify-content: flex-end;
}
</style>
