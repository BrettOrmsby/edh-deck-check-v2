<script lang="ts">
export default {
  name: "CardImage",
};
</script>

<template>
  <a
    :href="card?.url"
    target="_blank"
    :class="{ red: cardStore.cardsNotInDeck.includes(name) }"
  >
    <div class="loader" v-show="loading && !cardStore.isError">
      <SpinLoader size="2em" />
    </div>
    <div class="loader" v-show="cardStore.isError">
      <InlineMessage severity="error">Loading Error</InlineMessage>
    </div>
    <img
      v-show="!loading && !cardStore.isError"
      :src="card?.images.png"
      ref="imageElement"
      :alt="name"
    />
    <small
      ><a target="_blank" :href="buyCardLink(card)">{{
        toCurrency(card)
      }}</a></small
    >
  </a>
</template>

<script lang="ts" setup>
import SpinLoader from "@/components/utility/SpinLoader.vue";
import InlineMessage from "primevue/inlinemessage";
import getCard from "@/lib/getCard";
import normalizeCardName from "@/lib/normalizeCard";
import cardStore from "@/store/cards";
import preferences from "@/store/preferences";
import { computed, ref, watchEffect } from "vue";
import type { Card } from "@/lib/types";

const props = defineProps<{ name: string }>();
const loading = ref(true);
const imageElement = ref<HTMLImageElement | null>(null);
const card = computed(() => getCard(props.name));

watchEffect(() => {
  if (props.name) {
    loading.value = true;
  }
});

watchEffect(() => {
  if (card.value !== null && imageElement.value) {
    imageElement.value.onload = () => {
      loading.value = false;
    };
  }
});

const toCurrency = (card: Card | null): string => {
  if (card) {
    const prices = cardStore.price[normalizeCardName(card.name)];
    const price = prices[preferences.store]?.price || 0;
    return Number(price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  } else {
    return "0";
  }
};

const buyCardLink = (card: Card | null): string => {
  if (card) {
    const prices = cardStore.price[normalizeCardName(card.name)];
    return (
      prices[preferences.store]?.url?.split("?")?.[0] ||
      import.meta.env.BASE_URL
    );
  } else {
    return import.meta.env.BASE_URL;
  }
};
</script>

<style scoped>
img,
.loader {
  width: 200px;
  height: 279.19px;
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
  background-color: var(--surface-d);
  display: block;
  border-radius: var(--border-radius);
}
small {
  display: block;
  text-align: center;
  font-size: 0.7em;
}
</style>
