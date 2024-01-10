import { reactive } from "vue";
import type { PriceData } from "@/lib/types";

export default reactive<{
  isError: boolean;
  isLoaded: boolean;
  price: Record<string, PriceData>;
}>({
  isError: false,
  isLoaded: false,
  price: {},
});
