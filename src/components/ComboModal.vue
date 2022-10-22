<script lang="ts">
export default {
  name: "ComboModal",
};
</script>

<template>
  <Dialog
    :header="header"
    v-model:visible="comboStore.showComboModal"
    style="max-width: 800px; width: 100%; margin: 0 2em"
    :modal="true"
  >
    <h3>Cards</h3>
    <div class="cardsContainer">
      <CardImage
        v-for="(card, index) of comboStore.comboModal.cards"
        :key="index"
        :name="card"
      />
    </div>
    <h3>Prerequisites</h3>
    <ul>
      <li
        v-for="(item, index) in formatParagraphToList(
          comboStore.comboModal.before
        )"
        :key="index"
      >
        <SymbolText :text="item" />
      </li>
    </ul>
    <h3>Steps</h3>
    <ol>
      <li
        v-for="(item, index) in formatParagraphToList(
          comboStore.comboModal.howTo
        )"
        :key="index"
      >
        <SymbolText :text="item" />
      </li>
    </ol>
    <h3>Result</h3>
    <ul>
      <li
        v-for="(item, index) in formatParagraphToList(
          comboStore.comboModal.result
        )"
        :key="index"
      >
        <SymbolText :text="item" />
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
import Button from "primevue/button/sfc";
import CardImage from "@/components/combo/CardImage.vue";
import SymbolText from "@/components/combo/SymbolText.vue";
import { computed } from "vue";
import comboStore from "@/store/combos";

const header = computed(() => {
  const main = [...comboStore.comboModal.cards].splice(0, 2).join(" | ");
  if (comboStore.comboModal.cards.length > 2) {
    let plus = comboStore.comboModal.cards.length - 2;
    return `${main} | + ${plus} More`;
  }
  return main;
});

const formatParagraphToList = (text: string) => {
  if (!text) {
    return "";
  }
  return text
    .trim()
    .split(/\.(?!$)/g)
    .filter((e) => e);
};

const edhrecLinkColour = computed(() => {
  const comboIdentity = comboStore.comboModal.identity.split(",").sort();
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
