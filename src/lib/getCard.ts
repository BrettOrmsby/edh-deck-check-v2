import cardStore from "@/store/cards";
import type { Card } from "./types";
import normalizeCardName from "@/lib/normalizeCard";

export default function (cardName: string): Card | null {
  const defaultCardName = normalizeCardName(cardName);

  return cardStore.cards[defaultCardName];
}
