<template>
  <div
    class="p-button p-component stat"
    @mouseenter="showTooltip()"
    @mouseleave="hideTooltip()"
    @focus="showTooltip()"
    @blur="hideTooltip()"
    ref="stat"
  >
    {{ text }} <Badge :value="number" />
  </div>
  <div ref="tooltip" class="tooltip p-component">
    {{ tooltipMessage }}
  </div>
</template>

<script lang="ts" setup>
import Badge from "primevue/badge";
import { ref } from "vue";
import { computePosition, flip, shift, offset } from "@floating-ui/dom";

defineProps<{ text: string; tooltipMessage: string; number: number }>();

const revealed = ref(false);
const tooltip = ref<HTMLDivElement | null>(null);
const stat = ref<HTMLDivElement | null>(null);

const update = () => {
  if (!stat.value || !tooltip.value) {
    return;
  }
  computePosition(stat.value, tooltip.value, {
    placement: "top",
    middleware: [offset(5), flip(), shift()],
  }).then(({ x, y }) => {
    if (!stat.value || !tooltip.value) {
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
.tooltip {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  padding-left: 0.5em;
  z-index: 2;
  background: #3f4b5b;
  color: rgba(255, 255, 255, 0.87);
  padding: 0.5rem 0.75rem;
  box-shadow: none;
  border-radius: 4px;
}

#arrow {
  position: absolute;
}

.stat {
  cursor: auto;
  margin-top: var(--space-small);
  margin-right: calc(var(--space-small) / 2);
}
</style>
