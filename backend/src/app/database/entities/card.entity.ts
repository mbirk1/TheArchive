import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import {
  ICard,
  IImageUris,
  ILegalities,
  IPrices,
  IPurchaseUris,
  IRelatedCard,
  IRelatedUris,
} from 'lib';
import { Deck } from './deck.entity';
import { Collection } from './collection.entity';

@Entity('card', { schema: 'archive' })
export class Card implements ICard {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ nullable: true })
  object: string;

  @Column({ name: 'oracle_id', type: 'uuid', nullable: true })
  oracle_id: string;

  @Column({ type: 'int', array: true, default: [] })
  multiverse_ids: number[];

  @Column({ name: 'mtgo_id', type: 'int', nullable: true })
  mtgo_id: number;

  @Column({ name: 'arena_id', type: 'int', nullable: true })
  arena_id: number;

  @Column({ name: 'tcgplayer_id', type: 'int', nullable: true })
  tcgplayer_id: number;

  @Column({ name: 'cardmarket_id', type: 'int', nullable: true })
  cardmarket_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lang: string;

  @Column({ name: 'released_at', type: 'date', nullable: true })
  released_at: string;

  @Column({ nullable: true })
  uri: string;

  @Column({ name: 'scryfall_uri', nullable: true })
  scryfall_uri: string;

  @Column({ nullable: true })
  layout: string;

  @Column({ name: 'highres_image', default: false })
  highres_image: boolean;

  @Column({ name: 'image_status', nullable: true })
  image_status: string;

  @Column({ name: 'image_uris', type: 'jsonb', nullable: true })
  image_uris: IImageUris;

  @Column({ name: 'mana_cost', nullable: true })
  mana_cost: string;

  @Column({ type: 'numeric', nullable: true })
  cmc: number;

  @Column({ name: 'type_line', nullable: true })
  type_line: string;

  @Column({ name: 'oracle_text', nullable: true })
  oracle_text: string;

  @Column({ type: 'text', array: true, default: [] })
  colors: string[];

  @Column({ name: 'color_identity', type: 'text', array: true, default: [] })
  color_identity: string[];

  @Column({ type: 'jsonb', default: [] })
  keywords: string[];

  @Column({ name: 'produced_mana', type: 'text', array: true, nullable: true })
  produced_mana: string[];

  @Column({ name: 'all_parts', type: 'jsonb', nullable: true })
  all_parts: IRelatedCard[];

  @Column({ type: 'jsonb', nullable: true })
  legalities: ILegalities;

  @Column({ type: 'text', array: true, default: [] })
  games: string[];

  @Column({ default: false })
  reserved: boolean;

  @Column({ name: 'game_changer', default: false })
  game_changer: boolean;

  @Column({ default: false })
  foil: boolean;

  @Column({ default: false })
  nonfoil: boolean;

  @Column({ type: 'text', array: true, default: [] })
  finishes: string[];

  @Column({ default: false })
  oversized: boolean;

  @Column({ default: false })
  promo: boolean;

  @Column({ default: false })
  reprint: boolean;

  @Column({ default: false })
  variation: boolean;

  @Column({ name: 'set_id', type: 'uuid', nullable: true })
  set_id: string;

  @Column({ name: 'set_code', nullable: true })
  set: string;

  @Column({ name: 'set_name', nullable: true })
  set_name: string;

  @Column({ name: 'set_type', nullable: true })
  set_type: string;

  @Column({ name: 'set_uri', nullable: true })
  set_uri: string;

  @Column({ name: 'set_search_uri', nullable: true })
  set_search_uri: string;

  @Column({ name: 'scryfall_set_uri', nullable: true })
  scryfall_set_uri: string;

  @Column({ name: 'rulings_uri', nullable: true })
  rulings_uri: string;

  @Column({ name: 'prints_search_uri', nullable: true })
  prints_search_uri: string;

  @Column({ name: 'collector_number', nullable: true })
  collector_number: string;

  @Column({ default: false })
  digital: boolean;

  @Column({ nullable: true })
  rarity: string;

  @Column({ name: 'flavor_text', nullable: true })
  flavor_text: string;

  @Column({ name: 'card_back_id', type: 'uuid', nullable: true })
  card_back_id: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ name: 'artist_ids', type: 'text', array: true, default: [] })
  artist_ids: string[];

  @Column({ name: 'illustration_id', type: 'uuid', nullable: true })
  illustration_id: string;

  @Column({ name: 'border_color', nullable: true })
  border_color: string;

  @Column({ nullable: true })
  frame: string;

  @Column({ name: 'full_art', default: false })
  full_art: boolean;

  @Column({ default: false })
  textless: boolean;

  @Column({ default: false })
  booster: boolean;

  @Column({ name: 'story_spotlight', default: false })
  story_spotlight: boolean;

  @Column({ name: 'edhrec_rank', type: 'int', nullable: true })
  edhrec_rank: number;

  @Column({ name: 'penny_rank', type: 'int', nullable: true })
  penny_rank: number;

  @Column({ type: 'jsonb', nullable: true })
  prices: IPrices;

  @Column({ name: 'related_uris', type: 'jsonb', nullable: true })
  related_uris: IRelatedUris;

  @Column({ name: 'purchase_uris', type: 'jsonb', nullable: true })
  purchase_uris: IPurchaseUris;

  @Column({ type: 'jsonb', nullable: true })
  raw: ICard;

  @ManyToMany((type) => Deck, (x) => x.cards, {
    cascade: true,
    nullable: true,
  })
  decks: Deck[];

  @ManyToMany((type) => Collection, (x) => x.cards, {
    nullable: true,
  })
  collections: Collection[];
}
