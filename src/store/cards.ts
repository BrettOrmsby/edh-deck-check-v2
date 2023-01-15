import { reactive } from "vue";
import type { Card, PriceData } from "@/lib/types";

export default reactive<{
  isError: boolean;
  isLoaded: boolean;
  cardsNotInDeck: string[];
  cards: Record<string, Card>;
  price: Record<string, PriceData>;
}>({
  cardsNotInDeck: [],
  isError: false,
  isLoaded: false,
  cards: {},
  price: {},
});
