import { reactive } from "vue";
import type { RemovableRef } from "@vueuse/shared";
import type { PriceData } from "@/lib/types";
import { useStorage } from "@vueuse/core";

export type SortValues = "Price" | "Price Dec" | "Unsorted";

export default reactive<{
  store: RemovableRef<keyof PriceData>;
  showManaValue: RemovableRef<boolean>;
  showComboPrice: RemovableRef<boolean>;
  sortMethod: RemovableRef<SortValues>;
  isSidebarOpen: boolean;
}>({
  isSidebarOpen: false,
  store: useStorage<keyof PriceData>("store", "tcgplayer"),
  showManaValue: useStorage("showManaValue", false),
  showComboPrice: useStorage("showComboPrice", false),
  sortMethod: useStorage<SortValues>("sortMethod", "Unsorted"),
});
