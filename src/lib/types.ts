export type Price = {
  price: number | string;
  url: string;
};
export type PriceData = {
  cardkingdom: Price;
  tcgplayer: Price;
  cardhoarder: Price;
  cardmarket: Price;
  mtgstocks: Price;
};

export type Card = {
  id: number;
  name: string;
  oracleId: string;
  spoiler: boolean;
};

export type CardUse = {
  card: Card;
  zoneLocations: string[];
  battlefieldCardState: string;
  exileCardState: string;
  libraryCardState: string;
  graveyardCardState: string;
  mustBeCommander: boolean;
};

export type Produces = {
  id: number;
  name: string;
  description: string;
};

export type Legalities = {
  commander: boolean;
  pauperCommanderMain: boolean;
  pauperCommander: boolean;
  oathbreaker: boolean;
  predh: boolean;
  brawl: boolean;
  vintage: boolean;
  legacy: boolean;
  modern: boolean;
  pioneer: boolean;
  standard: boolean;
  pauper: boolean;
};

export type Combo = {
  id: string;
  uses: CardUse[];
  produces: Produces[];
  identity: string;
  manaNeeded: string;
  otherPrerequisites: string;
  description: string;
  popularity: number;
  legalities: Legalities;
};

export type ComboData = {
  identity: string;
  included: Combo[];
  almostIncluded: Combo[];
};

export type ComboResult = {
  count: number;
  next?: string;
  previous?: string;
  results: ComboData;
};
