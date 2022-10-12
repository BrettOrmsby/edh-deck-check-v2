<script lang="ts">
export default {
  name: "ComboModal",
};
</script>

<template>
  <Dialog
    :header="header"
    v-model:visible="comboStore.showComboModal"
    :style="{ width: '90vw' }"
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
    <template #footer>
      <a
        style="text-decoration: none"
        target="_blank"
        :href="`https://www.commanderspellbook.com/combo/${comboStore.comboModal.id}/`"
        ><Button icon="pi pi-book" label="Spell Book"
      /></a>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "primevue/dialog";
import Button from "primevue/Button";
import CardImage from "@/components/combo/CardImage.vue";
import SymbolText from "@/components/combo/SymbolText.vue";
import { computed } from "vue";
import comboStore from "@/store/combos";

const closeModal = () => {
  comboStore.showComboModal = false;
};

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
</script>

<style scoped>
.cardsContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: var(--space-small);
  column-gap: var(--space-small);
}
</style>
