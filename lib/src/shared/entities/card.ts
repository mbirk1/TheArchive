export interface ICard {
  id?: string;
  object: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id?: number;
  arena_id?: number;
  tcgplayer_id?: number;
  cardmarket_id?: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris?: IImageUris;
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;
  colors: string[];
  color_identity: string[];
  keywords: string[];
  produced_mana?: string[];
  all_parts?: IRelatedCard[];
  legalities: ILegalities;
  games: string[];
  reserved: boolean;
  game_changer: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
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
  flavor_text?: string;
  card_back_id?: string;
  artist?: string;
  artist_ids?: string[];
  illustration_id?: string;
  border_color: string;
  frame: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank?: number;
  penny_rank?: number;
  prices: IPrices;
  related_uris: IRelatedUris;
  purchase_uris: IPurchaseUris;
}

export interface IImageUris {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

export interface ILegalities {
  standard: LegalStatus;
  future: LegalStatus;
  historic: LegalStatus;
  timeless: LegalStatus;
  gladiator: LegalStatus;
  pioneer: LegalStatus;
  modern: LegalStatus;
  legacy: LegalStatus;
  pauper: LegalStatus;
  vintage: LegalStatus;
  penny: LegalStatus;
  commander: LegalStatus;
  oathbreaker: LegalStatus;
  standardbrawl: LegalStatus;
  brawl: LegalStatus;
  alchemy: LegalStatus;
  paupercommander: LegalStatus;
  duel: LegalStatus;
  oldschool: LegalStatus;
  premodern: LegalStatus;
  predh: LegalStatus;
  tlr: LegalStatus;
}

export type LegalStatus = 'legal' | 'not_legal' | 'restricted' | 'banned';

export interface IPrices {
  usd: string | null;
  usd_foil: string | null;
  usd_etched: string | null;
  eur: string | null;
  eur_foil: string | null;
  tix: string | null;
}

export interface IRelatedUris {
  gatherer?: string;
  tcgplayer_infinite_articles?: string;
  tcgplayer_infinite_decks?: string;
  edhrec?: string;
}

export interface IPurchaseUris {
  tcgplayer?: string;
  cardmarket?: string;
  cardhoarder?: string;
}

export interface IRelatedCard {
  object: string;
  id: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}