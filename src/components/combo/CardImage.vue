<template>
  <a :href="cardLinkURL" target="_blank" :class="{ red: !isInDeck }">
    <div class="loader" v-show="loading && !priceStore.isError">
      <SpinLoader size="2em" />
    </div>
    <div class="loader" v-show="priceStore.isError">
      <InlineMessage severity="error">Loading Error</InlineMessage>
    </div>
    <img
      v-show="!loading && !priceStore.isError"
      :src="cardImageURL"
      ref="imageElement"
      :alt="name"
    />
    <small
      ><a target="_blank" :href="buyCardLink">{{ currency }}</a></small
    >
  </a>
</template>

<script lang="ts" setup>
import SpinLoader from "@/components/utility/SpinLoader.vue";
import InlineMessage from "primevue/inlinemessage";
import normalizeCardName from "@/lib/normalizeCard";
import priceStore from "@/store/price";
import preferences from "@/store/preferences";
import { computed, ref, watchEffect } from "vue";

const props = defineProps<{ name: string; isInDeck: boolean }>();
const loading = ref(true);
const imageElement = ref<HTMLImageElement | null>(null);

const cardImageURL = computed(
  () =>
    `https://api.scryfall.com/cards/named?format=image&version=normal&exact=${encodeURI(
      props.name
    )}`
);
const cardLinkURL = computed(
  () => `https://scryfall.com/search?q=${encodeURI(`!"${props.name}"`)}`
);
watchEffect(() => {
  if (props.name) {
    loading.value = true;
  }
});

watchEffect(() => {
  if (props.name !== null && imageElement.value) {
    imageElement.value.onload = () => {
      loading.value = false;
    };
  }
});

const currency = computed(() => {
  const prices = priceStore.price[normalizeCardName(props.name)];
  const price = prices[preferences.store]?.price || 0;
  return Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
});

const buyCardLink = computed(() => {
  const prices = priceStore.price[normalizeCardName(props.name)];
  return (
    prices[preferences.store]?.url?.split("?")?.[0] || import.meta.env.BASE_URL
  );
});
</script>

<style scoped>
img,
.loader {
  width: 200px;
  height: 279.19px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
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
@/store/price
