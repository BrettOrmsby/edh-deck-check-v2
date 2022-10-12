import safeFetch from "./fetch";
import type { Combo } from "./types";
import comboStore from "@/store/combos";

export default async function () {
  type GoogleSheetResponse = {
    spreadsheetId: string;
    valueRanges: [
      {
        range: string;
        majorDimension: "ROWS";
        values: Array<string[]>;
      }
    ];
  };

  const data = await safeFetch<GoogleSheetResponse>(
    "https://sheets.googleapis.com/v4/spreadsheets/1KqyDRZRCgy8YgMFnY0tHSw_3jC99Z0zFvJrPbfm66vA/values:batchGet?ranges=combos!A2:Q&key=AIzaSyBD_rcme5Ff37Evxa4eW5BFQZkmTbgpHew"
  );
  if (data instanceof Error) {
    comboStore.isError = true;
    return;
  }

  const comboData: Combo[] = data.valueRanges[0].values
    .map((e) => {
      return {
        id: e[0],
        cards: e.slice(1, 11).filter((e) => e !== ""),
        identity: e[11],
        before: e[12],
        howTo: e[13],
        result: e[14],
      };
    })
    .filter((e) => e.cards.length > 0);

  comboStore.combos = comboData;
  comboStore.isLoaded = true;
}
