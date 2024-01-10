import { reactive } from "vue";
import type { Combo, ComboData } from "@/lib/types";

export default reactive<{
  isError: boolean;
  isLoaded: boolean;
  comboData: ComboData;
  comboModal: Combo;
  showComboModal: boolean;
  manaSymbols: Record<string, string>;
}>({
  isError: false,
  isLoaded: false,
  comboData: { identity: "", included: [], almostIncluded: [] },
  comboModal: {
    id: "",
    uses: [],
    produces: [],
    identity: "",
    manaNeeded: "",
    otherPrerequisites: "",
    description: "",
    popularity: 0,
    legalities: {
      commander: false,
      pauperCommanderMain: false,
      pauperCommander: false,
      oathbreaker: false,
      predh: false,
      brawl: false,
      vintage: false,
      legacy: false,
      modern: false,
      pioneer: false,
      standard: false,
      pauper: false,
    },
  },
  showComboModal: false,
  manaSymbols: {},
});
