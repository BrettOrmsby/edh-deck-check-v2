import type { ComboResult, ComboData } from "../types";
import comboStore from "@/store/combos";

export default async function getComboData(deck: string[]) {
  comboStore.isError = false;
  comboStore.isLoaded = false;
  const comboData = await fetchCombos(deck);
  comboStore.comboData = comboData;
  comboStore.isLoaded = true;
}

async function fetchCombos(
  deck: string[],
  pageURL = "https://backend.commanderspellbook.com/find-my-combos"
): Promise<ComboData> {
  const response = await fetch(pageURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commanders: [], main: deck }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error getting  combo data: ", errorData);
    comboStore.isError = true;
  }

  const responseData: ComboResult = await response.json();

  if (responseData.next) {
    const nextData = await fetchCombos(deck, responseData.next);

    return {
      identity: responseData.results.identity,
      included: [...responseData.results.included, ...nextData.included].filter(
        (combo) => combo.legalities.commander
      ),
      almostIncluded: [
        ...responseData.results.almostIncluded,
        ...nextData.almostIncluded,
      ].filter((combo) => combo.legalities.commander),
    };
  }

  return responseData.results;
}
