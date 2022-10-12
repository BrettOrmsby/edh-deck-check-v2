<script lang="ts">
export default {
  name: "SymbolText",
};
</script>

<template>
  <span>
    <template v-for="(match, index) of matchedInput" :key="index">
      <img
        v-if="/\{.+?\}/.test(match) && comboStore.manaSymbols[match]"
        class="symbol"
        :alt="match.slice(1, -1)"
        :src="comboStore.manaSymbols[match]"
      />
      <span v-else>{{ match }}</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
import comboStore from "@/store/combos";
import { computed } from "vue";
const props = defineProps<{ text: string }>();

const matchedInput = computed(() =>
  props.text.trim().match(/(?:(?:(?!\{.+?\})[\s\S])+)|\{.+?\}/g)
);
</script>