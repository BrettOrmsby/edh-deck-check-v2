<template>
  <a
    href="#nolink"
    ref="link"
    @mouseenter="showTooltip()"
    @mouseleave="hideTooltip()"
    @focus="showTooltip()"
    @blur="hideTooltip()"
    :class="{ red: !isInDeck }"
    >{{ name }}</a
  >
  <div
    ref="tooltip"
    id="tooltip"
    @mouseenter="showTooltip()"
    @mouseleave="hideTooltip()"
    @focus="showTooltip()"
    @blur="hideTooltip()"
  >
    <CardImage v-if="revealed" :name="name" isInDeck />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CardImage from "./CardImage.vue";
import { computePosition, flip, shift } from "@floating-ui/dom";

defineProps<{ name: string; isInDeck: boolean }>();

const revealed = ref(false);
const tooltip = ref<HTMLDivElement | null>(null);
const link = ref<HTMLAnchorElement | null>(null);

const update = () => {
  if (!link.value || !tooltip.value) {
    return;
  }
  computePosition(link.value, tooltip.value, {
    placement: "right",
    middleware: [flip(), shift()],
  }).then(({ x, y }) => {
    if (!link.value || !tooltip.value) {
      return;
    }
    Object.assign(tooltip.value.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
};

function showTooltip() {
  if (!tooltip.value) {
    return;
  }
  tooltip.value.style.display = "block";
  revealed.value = true;
  update();
}

function hideTooltip() {
  if (!tooltip.value) {
    return;
  }
  tooltip.value.style.display = "none";
  revealed.value = false;
}
</script>

<style scoped>
#tooltip {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  padding-left: 0.5em;
  z-index: 2;
}

a {
  text-decoration: none;
}
</style>
