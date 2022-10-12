<script lang="ts">
export default {
  name: "CardImage",
};
</script>

<template>
  <a :href="card?.url" target="_blank">
    <div class="loader" v-show="loading && !cardStore.isError">
      <i class="pi pi-spin pi-spinner"></i>
    </div>
    <div class="loader" v-show="cardStore.isError"><span>Error</span></div>
    <img
      v-show="!loading && !cardStore.isError"
      :src="card?.images.png"
      ref="imageElement"
      :alt="name"
    />
    <small>${{ card?.price || "" }}</small>
  </a>
</template>

<script lang="ts" setup>
import getCard from "@/lib/getCard";
import cardStore from "@/store/cards";
import { computed, ref, watchEffect } from "vue";
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
  color: var(--primary-400);
  background-color: var(--surface-d);
  display: block;
  border-radius: var(--border-radius);
}
small {
  display: block;
  text-align: center;
  font-size: 0.7em;
}
.pi {
  font-size: 2em;
  color: var(--primary-400);
}
</style>
