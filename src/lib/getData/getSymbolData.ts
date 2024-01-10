import safeFetch from "../fetch";
import comboStore from "@/store/combos";

export default async function () {
  type SymbolObject = {
    symbol: string;
    svg_uri: string;
  };
  type SymbolData = {
    data: SymbolObject[];
  };
  const symbolData = await safeFetch<SymbolData>(
    "https://api.scryfall.com/symbology"
  );
  if (symbolData instanceof Error) {
    return;
  }
  const symbolMap: Record<string, string> = {};
  symbolData.data.forEach((e) => {
    symbolMap[e.symbol] = e.svg_uri;
    symbolMap[e.symbol.toLowerCase()] = e.svg_uri;
  });
  comboStore.manaSymbols = symbolMap;
}
