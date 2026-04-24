import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1776974964877 implements MigrationInterface {
  name = 'Migration1776974964877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sideboard"."card" ("id" uuid NOT NULL, "object" character varying, "oracle_id" uuid, "multiverse_ids" integer array NOT NULL DEFAULT '{}', "mtgo_id" integer, "arena_id" integer, "tcgplayer_id" integer, "cardmarket_id" integer, "name" character varying, "lang" character varying, "released_at" date, "uri" character varying, "scryfall_uri" character varying, "layout" character varying, "highres_image" boolean NOT NULL DEFAULT false, "image_status" character varying, "image_uris" jsonb, "mana_cost" character varying, "cmc" numeric, "type_line" character varying, "oracle_text" character varying, "colors" text array NOT NULL DEFAULT '{}', "color_identity" text array NOT NULL DEFAULT '{}', "keywords" jsonb NOT NULL DEFAULT '[]', "produced_mana" text array, "all_parts" jsonb, "legalities" jsonb, "games" text array NOT NULL DEFAULT '{}', "reserved" boolean NOT NULL DEFAULT false, "game_changer" boolean NOT NULL DEFAULT false, "foil" boolean NOT NULL DEFAULT false, "nonfoil" boolean NOT NULL DEFAULT false, "finishes" text array NOT NULL DEFAULT '{}', "oversized" boolean NOT NULL DEFAULT false, "promo" boolean NOT NULL DEFAULT false, "reprint" boolean NOT NULL DEFAULT false, "variation" boolean NOT NULL DEFAULT false, "set_id" uuid, "set_code" character varying, "set_name" character varying, "set_type" character varying, "set_uri" character varying, "set_search_uri" character varying, "scryfall_set_uri" character varying, "rulings_uri" character varying, "prints_search_uri" character varying, "collector_number" character varying, "digital" boolean NOT NULL DEFAULT false, "rarity" character varying, "flavor_text" character varying, "card_back_id" uuid, "artist" character varying, "artist_ids" text array NOT NULL DEFAULT '{}', "illustration_id" uuid, "border_color" character varying, "frame" character varying, "full_art" boolean NOT NULL DEFAULT false, "textless" boolean NOT NULL DEFAULT false, "booster" boolean NOT NULL DEFAULT false, "story_spotlight" boolean NOT NULL DEFAULT false, "edhrec_rank" integer, "penny_rank" integer, "prices" jsonb, "related_uris" jsonb, "purchase_uris" jsonb, "raw" jsonb, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sideboard"."card"`);
  }
}
