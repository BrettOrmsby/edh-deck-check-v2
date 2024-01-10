<template>
  <Sidebar v-model:visible="preferences.isSidebarOpen" position="left">
    <h2>Show Additional Content</h2>
    <div>
      <Checkbox
        inputId="showManaValue"
        v-model="preferences.showManaValue"
        :binary="true"
      />
      <label for="showManaValue">Show Combo Mana Values</label>
    </div>
    <div>
      <Checkbox
        inputId="showComboPrice"
        v-model="preferences.showComboPrice"
        :binary="true"
      />
      <label for="showComboPrice">Show Combo Price</label>
    </div>
    <h2>Price</h2>
    <div v-for="store in Object.keys(stores)" :key="store">
      <RadioButton
        :inputId="store"
        name="category"
        :value="store"
        v-model="preferences.store"
      />
      <label :for="store">{{ stores[store] }}</label>
    </div>
    <h2>Sort Combos By</h2>
    <div v-for="value of sortValues" :key="value">
      <RadioButton
        :inputId="value"
        name="category"
        :value="value"
        v-model="preferences.sortMethod"
      />
      <label :for="value">{{ value }}</label>
    </div>
  </Sidebar>
</template>

<script lang="ts" setup>
import { default as preferences, type SortValues } from "@/store/preferences";
import Sidebar from "primevue/sidebar";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";

const stores: Record<string, string> = {
  cardkingdom: "Card Kingdom",
  tcgplayer: "TCG Player",
  cardhoarder: "Card Hoarder",
  cardmarket: "Card Market",
  mtgstocks: "MTG Stocks",
};

const sortValues: SortValues[] = ["Price", "Price Dec", "Unsorted"];
</script>

<style scoped>
label {
  margin-left: calc(var(--space-small) / 2);
}
</style>
