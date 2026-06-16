import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1781604781748 implements MigrationInterface {
    name = 'Migration1781604781748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "archive"."collection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, CONSTRAINT "REL_4f925485b013b52e32f43d430f" UNIQUE ("user_id"), CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "archive"."card" ("id" uuid NOT NULL, "object" character varying, "oracle_id" uuid, "multiverse_ids" integer array NOT NULL DEFAULT '{}', "mtgo_id" integer, "arena_id" integer, "tcgplayer_id" integer, "cardmarket_id" integer, "name" character varying, "lang" character varying, "released_at" date, "uri" character varying, "scryfall_uri" character varying, "layout" character varying, "highres_image" boolean NOT NULL DEFAULT false, "image_status" character varying, "image_uris" jsonb, "mana_cost" character varying, "cmc" numeric, "type_line" character varying, "oracle_text" character varying, "colors" text array NOT NULL DEFAULT '{}', "color_identity" text array NOT NULL DEFAULT '{}', "keywords" jsonb NOT NULL DEFAULT '[]', "produced_mana" text array, "all_parts" jsonb, "legalities" jsonb, "games" text array NOT NULL DEFAULT '{}', "reserved" boolean NOT NULL DEFAULT false, "game_changer" boolean NOT NULL DEFAULT false, "foil" boolean NOT NULL DEFAULT false, "nonfoil" boolean NOT NULL DEFAULT false, "finishes" text array NOT NULL DEFAULT '{}', "oversized" boolean NOT NULL DEFAULT false, "promo" boolean NOT NULL DEFAULT false, "reprint" boolean NOT NULL DEFAULT false, "variation" boolean NOT NULL DEFAULT false, "set_id" uuid, "set_code" character varying, "set_name" character varying, "set_type" character varying, "set_uri" character varying, "set_search_uri" character varying, "scryfall_set_uri" character varying, "rulings_uri" character varying, "prints_search_uri" character varying, "collector_number" character varying, "digital" boolean NOT NULL DEFAULT false, "rarity" character varying, "flavor_text" character varying, "card_back_id" uuid, "artist" character varying, "artist_ids" text array NOT NULL DEFAULT '{}', "illustration_id" uuid, "border_color" character varying, "frame" character varying, "full_art" boolean NOT NULL DEFAULT false, "textless" boolean NOT NULL DEFAULT false, "booster" boolean NOT NULL DEFAULT false, "story_spotlight" boolean NOT NULL DEFAULT false, "edhrec_rank" integer, "penny_rank" integer, "prices" jsonb, "related_uris" jsonb, "purchase_uris" jsonb, "raw" jsonb, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "archive"."deck" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_99f8010303acab0edf8e1df24f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "archive"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "lastActiveAt" TIMESTAMP NOT NULL, "refreshToken" character varying, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "archive"."collection_cards_card" ("collectionId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_607f35a8b19b485f7b22ff190a3" PRIMARY KEY ("collectionId", "cardId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0bfe8a6059348dbb99d71fc9d" ON "archive"."collection_cards_card" ("collectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2b7edc195840ad983ebd047791" ON "archive"."collection_cards_card" ("cardId") `);
        await queryRunner.query(`CREATE TABLE "archive"."deck_cards_card" ("deckId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_dcfd67e7964b5a18815c12739f3" PRIMARY KEY ("deckId", "cardId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0722f3114d3f770b07646af8ab" ON "archive"."deck_cards_card" ("deckId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd453408658286bec79a79c2af" ON "archive"."deck_cards_card" ("cardId") `);
        await queryRunner.query(`ALTER TABLE "archive"."collection" ADD CONSTRAINT "FK_4f925485b013b52e32f43d430f6" FOREIGN KEY ("user_id") REFERENCES "archive"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "archive"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "archive"."collection_cards_card" ADD CONSTRAINT "FK_a0bfe8a6059348dbb99d71fc9dc" FOREIGN KEY ("collectionId") REFERENCES "archive"."collection"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "archive"."collection_cards_card" ADD CONSTRAINT "FK_2b7edc195840ad983ebd0477911" FOREIGN KEY ("cardId") REFERENCES "archive"."card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "archive"."deck_cards_card" ADD CONSTRAINT "FK_0722f3114d3f770b07646af8abc" FOREIGN KEY ("deckId") REFERENCES "archive"."deck"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "archive"."deck_cards_card" ADD CONSTRAINT "FK_bd453408658286bec79a79c2af1" FOREIGN KEY ("cardId") REFERENCES "archive"."card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "archive"."deck_cards_card" DROP CONSTRAINT "FK_bd453408658286bec79a79c2af1"`);
        await queryRunner.query(`ALTER TABLE "archive"."deck_cards_card" DROP CONSTRAINT "FK_0722f3114d3f770b07646af8abc"`);
        await queryRunner.query(`ALTER TABLE "archive"."collection_cards_card" DROP CONSTRAINT "FK_2b7edc195840ad983ebd0477911"`);
        await queryRunner.query(`ALTER TABLE "archive"."collection_cards_card" DROP CONSTRAINT "FK_a0bfe8a6059348dbb99d71fc9dc"`);
        await queryRunner.query(`ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`);
        await queryRunner.query(`ALTER TABLE "archive"."collection" DROP CONSTRAINT "FK_4f925485b013b52e32f43d430f6"`);
        await queryRunner.query(`DROP INDEX "archive"."IDX_bd453408658286bec79a79c2af"`);
        await queryRunner.query(`DROP INDEX "archive"."IDX_0722f3114d3f770b07646af8ab"`);
        await queryRunner.query(`DROP TABLE "archive"."deck_cards_card"`);
        await queryRunner.query(`DROP INDEX "archive"."IDX_2b7edc195840ad983ebd047791"`);
        await queryRunner.query(`DROP INDEX "archive"."IDX_a0bfe8a6059348dbb99d71fc9d"`);
        await queryRunner.query(`DROP TABLE "archive"."collection_cards_card"`);
        await queryRunner.query(`DROP TABLE "archive"."user"`);
        await queryRunner.query(`DROP TABLE "archive"."deck"`);
        await queryRunner.query(`DROP TABLE "archive"."card"`);
        await queryRunner.query(`DROP TABLE "archive"."collection"`);
    }

}
