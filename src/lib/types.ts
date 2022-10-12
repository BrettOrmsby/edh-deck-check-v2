export type Card = {
  name: string;
  images: {
    png: string;
    art: string;
  };
  url: string;
  price: string;
  colourId: string[];
};

export type Combo = {
  id: string;
  cards: string[];
  identity: string;
  before: string;
  howTo: string;
  result: string;
};
