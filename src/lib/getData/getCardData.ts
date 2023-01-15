import safeFetch from "../fetch";
import cardStore from "@/store/cards";
import normalizeCardName from "@/lib/normalizeCard";
import type { Card } from "../types";
export default async function () {
  type BulkDataResponse = {
    data: Array<{
      type: string;
      download_uri: string;
    }>;
  };
  type ScryfallApiData = {
    object: "card";
    id: string;
    oracle_id: string;
    multiverse_ids: number[];
    mtgo_id: number;
    mtgo_foil_id: number;
    tcgplayer_id: number;
    cardmarket_id: number;
    name: string;
    flavor_name?: string;
    card_faces?: Array<{
      image_uris: {
        small: string;
        normal: string;
        large: string;
        png: string;
        art_crop: string;
        border_crop: string;
      };
    }>;
    lang: "en";
    released_at: string;
    uri: string;
    scryfall_uri: string;
    layout: string;
    highres_image: boolean;
    image_status: string;
    image_uris?: {
      small: string;
      normal: string;
      large: string;
      png: string;
      art_crop: string;
      border_crop: string;
    };
    mana_cost: string;
    cmc: number;
    type_line: string;
    oracle_text: string;
    colors: string[];
    color_identity: string[];
    keywords: string[];
    legalities: {
      standard: string;
      future: string;
      historic: string;
      gladiator: string;
      pioneer: string;
      modern: string;
      legacy: string;
      pauper: string;
      vintage: string;
      penny: string;
      commander: string;
      brawl: string;
      duel: string;
      oldschool: string;
      premodern: string;
    };
    games: string[];
    reserved: boolean;
    foil: boolean;
    nonfoil: boolean;
    oversized: boolean;
    promo: boolean;
    reprint: boolean;
    variation: boolean;
    set: string;
    set_name: string;
    set_type: string;
    set_uri: string;
    set_search_uri: string;
    scryfall_set_uri: string;
    rulings_uri: string;
    prints_search_uri: string;
    collector_number: string;
    digital: boolean;
    rarity: string;
    flavor_text: string;
    card_back_id: string;
    artist: string;
    artist_ids: string[];
    illustration_id: string;
    border_color: string;
    frame: string;
    full_art: boolean;
    textless: boolean;
    booster: boolean;
    story_spotlight: boolean;
    edhrec_rank: number;
    prices: {
      usd: string;
      usd_foil: string;
      eur: string;
      eur_foil: string;
      tix: string;
    };
    related_uris: {
      gatherer: string;
      tcgplayer_infinite_articles: string;
      tcgplayer_infinite_decks: string;
      edhrec: string;
      mtgtop8: string;
    };
  };

  const bulkData = await safeFetch<BulkDataResponse>(
    "https://api.scryfall.com/bulk-data"
  );
  if (bulkData instanceof Error) {
    cardStore.isError = true;
    return;
  }

  const bulkDataUrl =
    bulkData.data.find((e) => (e.type = "oracle_cards"))?.download_uri ||
    "https://data.scryfall.io/oracle-cards/oracle-cards-20221009210255.json";

  const scryfallData = await safeFetch<ScryfallApiData[]>(bulkDataUrl);

  if (scryfallData instanceof Error) {
    cardStore.isError = true;
    return;
  }

  const cardData: { [key: string]: Card } = {};
  for (const card of scryfallData) {
    if (
      card.set_type === "token" ||
      card.set_type === "memorabilia" ||
      card.legalities.commander !== "legal"
    ) {
      continue;
    }
    let images = card.image_uris;
    if (!images && card.card_faces) {
      images = card.card_faces[0].image_uris;
    }
    if (!images) {
      return;
    }
    const cardName = normalizeCardName(card.name);
    cardData[cardName] = {
      name: card.name,
      images: {
        png: images.png,
        art: images.art_crop,
      },
      url: card.scryfall_uri,
      colourId: card.color_identity,
      manaCost: card.mana_cost,
    };
  }

  cardStore.cards = cardData;
  cardStore.isLoaded = true;
}
