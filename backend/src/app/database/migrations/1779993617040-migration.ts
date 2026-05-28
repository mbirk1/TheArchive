import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1779993617040 implements MigrationInterface {
    name = 'Migration1779993617040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "archive"."card" ("id" uuid NOT NULL, "object" character varying, "oracle_id" uuid, "multiverse_ids" integer array NOT NULL DEFAULT '{}', "mtgo_id" integer, "arena_id" integer, "tcgplayer_id" integer, "cardmarket_id" integer, "name" character varying, "lang" character varying, "released_at" date, "uri" character varying, "scryfall_uri" character varying, "layout" character varying, "highres_image" boolean NOT NULL DEFAULT false, "image_status" character varying, "image_uris" jsonb, "mana_cost" character varying, "cmc" numeric, "type_line" character varying, "oracle_text" character varying, "colors" text array NOT NULL DEFAULT '{}', "color_identity" text array NOT NULL DEFAULT '{}', "keywords" jsonb NOT NULL DEFAULT '[]', "produced_mana" text array, "all_parts" jsonb, "legalities" jsonb, "games" text array NOT NULL DEFAULT '{}', "reserved" boolean NOT NULL DEFAULT false, "game_changer" boolean NOT NULL DEFAULT false, "foil" boolean NOT NULL DEFAULT false, "nonfoil" boolean NOT NULL DEFAULT false, "finishes" text array NOT NULL DEFAULT '{}', "oversized" boolean NOT NULL DEFAULT false, "promo" boolean NOT NULL DEFAULT false, "reprint" boolean NOT NULL DEFAULT false, "variation" boolean NOT NULL DEFAULT false, "set_id" uuid, "set_code" character varying, "set_name" character varying, "set_type" character varying, "set_uri" character varying, "set_search_uri" character varying, "scryfall_set_uri" character varying, "rulings_uri" character varying, "prints_search_uri" character varying, "collector_number" character varying, "digital" boolean NOT NULL DEFAULT false, "rarity" character varying, "flavor_text" character varying, "card_back_id" uuid, "artist" character varying, "artist_ids" text array NOT NULL DEFAULT '{}', "illustration_id" uuid, "border_color" character varying, "frame" character varying, "full_art" boolean NOT NULL DEFAULT false, "textless" boolean NOT NULL DEFAULT false, "booster" boolean NOT NULL DEFAULT false, "story_spotlight" boolean NOT NULL DEFAULT false, "edhrec_rank" integer, "penny_rank" integer, "prices" jsonb, "related_uris" jsonb, "purchase_uris" jsonb, "raw" jsonb, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "archive"."deck" ("id" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_99f8010303acab0edf8e1df24f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "lastActiveAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "archive"."card_decks_deck" ("cardId" uuid NOT NULL, "deckId" uuid NOT NULL, CONSTRAINT "PK_b22f54c08f237f716fd425e175f" PRIMARY KEY ("cardId", "deckId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_70a78feb927276fd56472dbe6b" ON "archive"."card_decks_deck" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_17836567c71c0cf1827ebc5bdc" ON "archive"."card_decks_deck" ("deckId") `);
        await queryRunner.query(`ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "archive"."card_decks_deck" ADD CONSTRAINT "FK_70a78feb927276fd56472dbe6b8" FOREIGN KEY ("cardId") REFERENCES "archive"."card"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "archive"."card_decks_deck" ADD CONSTRAINT "FK_17836567c71c0cf1827ebc5bdce" FOREIGN KEY ("deckId") REFERENCES "archive"."deck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "archive"."card_decks_deck" DROP CONSTRAINT "FK_17836567c71c0cf1827ebc5bdce"`);
        await queryRunner.query(`ALTER TABLE "archive"."card_decks_deck" DROP CONSTRAINT "FK_70a78feb927276fd56472dbe6b8"`);
        await queryRunner.query(`ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`);
        await queryRunner.query(`DROP INDEX "archive"."IDX_17836567c71c0cf1827ebc5bdc"`);
        await queryRunner.query(`DROP INDEX "archive"."IDX_70a78feb927276fd56472dbe6b"`);
        await queryRunner.query(`DROP TABLE "archive"."card_decks_deck"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "archive"."deck"`);
        await queryRunner.query(`DROP TABLE "archive"."card"`);
    }

}
