export type Card = {
  name: string;
  images: {
    png: string;
    art: string;
  };
  url: string;
  colourId: string[];
  manaCost: string;
};

export type Combo = {
  id: string;
  cards: string[];
  identity: string;
  before: string;
  howTo: string;
  result: string;
};

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
