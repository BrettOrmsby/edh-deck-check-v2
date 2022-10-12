import { reactive } from "vue";
import type { Card } from "@/lib/types";

export default reactive<{
  isError: boolean;
  isLoaded: boolean;
  cardsNotInDeck: string[];
  cards: { [key: string]: Card };
}>({
  cardsNotInDeck: [],
  isError: false,
  isLoaded: false,
  cards: {},
});
