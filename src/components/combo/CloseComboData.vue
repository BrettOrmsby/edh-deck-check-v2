<script lang="ts">
export default {
  name: "CloseComboData",
};
</script>

<template>
  <div v-if="isShown" style="margin-bottom: var(--space-medium)">
    <Panel header="Missing Card Summary" :collapsed="true" :toggleable="true">
      <DataTable
        :value="data"
        removableSort
        stripedRows
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <Column field="name" header="Name" :sortable="true">
          <template #body="slotProps">
            <CardLink :name="slotProps.data.name" />
          </template>
        </Column>
        <Column field="price" header="Price" :sortable="true">
          <template #body="slotProps">
            {{
              slotProps.data.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            }}
          </template>
        </Column>
        <Column
          field="comboNumber"
          header="# of Combos"
          :sortable="true"
        ></Column>
        <Column field="results" header="Results">
          <template #body="slotProps">
            <ul>
              <li
                v-for="(result, index) in slotProps.data.results"
                :key="index"
              >
                {{ result }}
              </li>
            </ul>
          </template>
        </Column>
      </DataTable>
    </Panel>
  </div>
</template>

<script lang="ts" setup>
import CardLink from "./CardLink.vue";
import Panel from "primevue/panel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import normalizeCardName from "@/lib/normalizeCard";
import comboStore from "@/store/combos";
import cardStore from "@/store/cards";
import { computed } from "vue";

const isShown = computed(() => {
  return (
    !comboStore.isError &&
    !cardStore.isError &&
    comboStore.isLoaded &&
    cardStore.isLoaded &&
    comboStore.closeCombos.length > 1
  );
});

type MissingCardData = {
  name: string;
  price: number;
  comboNumber: number;
  results: string[];
};
const data = computed(() => {
  let cardData: MissingCardData[] = [];
  for (let card of cardStore.cardsNotInDeck) {
    const normalizedCard = normalizeCardName(card);
    let combosPerCard = 0;
    let resultsArray: string[] = [];
    for (let combo of comboStore.closeCombos) {
      for (let comboCard of combo.cards) {
        if (normalizeCardName(comboCard) === normalizedCard) {
          combosPerCard += 1;
          for (let result of combo.result.split(".")) {
            if (result.trim()) {
              resultsArray.push(result);
            }
          }
        }
      }
    }
    resultsArray = [...new Set(resultsArray)].sort();
    cardData.push({
      name: card,
      price: cardStore.price[normalizedCard] || 0,
      comboNumber: combosPerCard,
      results: resultsArray,
    });
  }
  return cardData;
});
</script>

<style scoped>
:deep(.p-panel .p-panel-content) {
  padding: 0;
}
:deep(.p-datatable-table) {
  min-width: 600px;
  width: 100%;
}
</style>
