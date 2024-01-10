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
            <CardLink :name="slotProps.data.name" :isInDeck="false" />
          </template>
        </Column>
        <Column field="price" header="Price" :sortable="true">
          <template #body="slotProps">
            <div style="text-align: right">
              {{
                slotProps.data.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </div>
          </template>
        </Column>
        <Column field="comboNumber" header="# of Combos" :sortable="true">
          <template #body="slotProps">
            <div style="text-align: right">
              {{ slotProps.data.comboNumber }}
            </div>
          </template>
        </Column>
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
import preferences from "@/store/preferences";
import priceStore from "@/store/price";
import type { PriceData } from "@/lib/types";
import { computed } from "vue";

const props = defineProps<{ cardsInDeck: string[] }>();

const isShown = computed(() => {
  return (
    !comboStore.isError &&
    comboStore.isLoaded &&
    comboStore.comboData.almostIncluded.length > 1
  );
});

type MissingCardData = Record<
  string,
  {
    name: string;
    price: string;
    comboNumber: number;
    results: string[];
  }
>;

const data = computed(() => {
  let cardData: MissingCardData = {};
  for (let combo of comboStore.comboData.almostIncluded) {
    for (let comboCard of combo.uses) {
      if (props.cardsInDeck.includes(comboCard.card.name)) {
        continue;
      }
      const cardName = comboCard.card.name;
      if (!(normalizeCardName(cardName) in cardData)) {
        cardData[normalizeCardName(cardName)] = {
          name: cardName,
          price: toCurrency(priceStore.price[normalizeCardName(cardName)]),
          comboNumber: 0,
          results: [],
        };
      }
      cardData[normalizeCardName(cardName)].comboNumber += 1;
    }
  }
  return Object.keys(cardData).map((key) => cardData[key]); // Object.values(cardData)
});

const toCurrency = (prices: PriceData): string => {
  if (prices) {
    const price = prices[preferences.store]?.price || 0;
    return Number(price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  } else {
    return "0";
  }
};
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
