import safeFetch from "../fetch";
import cardStore from "@/store/cards";
import normalizeCardName from "@/lib/normalizeCard";
export default async function () {
  type Price = {
    price: number | string;
    url: string;
  };
  type PriceData = Record<
    string,
    {
      cardkingdom: Price;
      tcgplayer: Price;
      cardhoarder: Price;
    }
  >;

  const priceData = await safeFetch<PriceData>(
    "https://json.edhrec.com/static/prices"
  );
  if (priceData instanceof Error) {
    return;
  }

  const priceObj: Record<string, number> = {};
  for (const cardName in priceData) {
    const normalizedCardName = normalizeCardName(cardName);
    const price = Number(priceData[cardName]?.tcgplayer?.price || 0);
    priceObj[normalizedCardName] = price;
  }
  cardStore.price = priceObj;
}
