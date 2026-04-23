import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'card' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'oracle_id', type: 'uuid', nullable: true })
  oracleId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lang: string;

  @Column({ name: 'released_at', type: 'date', nullable: true })
  releasedAt: string;

  @Column({ nullable: true })
  layout: string;

  @Column({ name: 'image_uris', type: 'jsonb', nullable: true })
  imageUris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };

  @Column({ name: 'mana_cost', nullable: true })
  manaCost: string;

  @Column({ type: 'numeric', nullable: true })
  cmc: number;

  @Column({ name: 'type_line', nullable: true })
  typeLine: string;

  @Column({ name: 'oracle_text', nullable: true })
  oracleText: string;

  @Column({ type: 'text', array: true, default: [] })
  colors: string[];

  @Column({ name: 'color_identity', type: 'text', array: true, default: [] })
  colorIdentity: string[];

  @Column({ type: 'text', array: true, default: [] })
  keywords: string[];

  @Column({ name: 'produced_mana', type: 'text', array: true, nullable: true })
  producedMana: string[];

  @Column({ type: 'jsonb', nullable: true })
  legalities: Record<string, string>;

  @Column({ type: 'text', array: true, default: [] })
  games: string[];

  @Column({ nullable: true })
  rarity: string;

  @Column({ name: 'set_code', nullable: true })
  setCode: string;

  @Column({ name: 'set_name', nullable: true })
  setName: string;

  @Column({ name: 'collector_number', nullable: true })
  collectorNumber: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ name: 'border_color', nullable: true })
  borderColor: string;

  @Column({ nullable: true })
  frame: string;

  @Column({ name: 'full_art', default: false })
  fullArt: boolean;

  @Column({ default: false })
  foil: boolean;

  @Column({ default: false })
  nonfoil: boolean;

  @Column({ default: false })
  reprint: boolean;

  @Column({ type: 'jsonb', nullable: true })
  prices: {
    usd: string | null;
    usd_foil: string | null;
    usd_etched: string | null;
    eur: string | null;
    eur_foil: string | null;
    tix: string | null;
  };

  @Column({ type: 'jsonb', nullable: true })
  raw: Record<string, any>;
}
