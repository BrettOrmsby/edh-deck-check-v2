import { reactive } from "vue";
import type { Combo } from "@/lib/types";

export default reactive<{
  isError: boolean;
  isLoaded: boolean;
  combos: Combo[];
  almostCombosInDeck: Combo[];
  combosInDeck: Combo[];
  comboModal: Combo;
  showComboModal: boolean;
  manaSymbols: Record<string, string>;
}>({
  isError: false,
  isLoaded: false,
  combos: [],
  almostCombosInDeck: [],
  combosInDeck: [],
  comboModal: {
    id: "",
    cards: [],
    identity: "",
    before: "",
    howTo: "",
    result: "",
  },
  showComboModal: false,
  manaSymbols: {},
});
