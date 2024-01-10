import safeFetch from "../fetch";
import cardStore from "@/store/price";
import normalizeCardName from "@/lib/normalizeCard";
import type { PriceData } from "@/lib/types";
export default async function () {
  const priceData = await safeFetch<Record<string, PriceData>>(
    "https://json.edhrec.com/static/prices"
  );
  if (priceData instanceof Error) {
    return;
  }

  const priceObj: Record<string, PriceData> = {};
  for (const cardName in priceData) {
    const normalizedCardName = normalizeCardName(cardName);
    priceObj[normalizedCardName] = priceData[cardName];
  }
  cardStore.price = priceObj;
}
