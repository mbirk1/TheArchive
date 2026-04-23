import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1776971090533 implements MigrationInterface {
  name = 'Migration1776971090533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "dump"`);
    await queryRunner.query(`ALTER TABLE "card" ADD "oracle_id" uuid`);
    await queryRunner.query(`ALTER TABLE "card" ADD "lang" character varying`);
    await queryRunner.query(`ALTER TABLE "card" ADD "released_at" date`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD "layout" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "card" ADD "image_uris" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD "mana_cost" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "card" ADD "cmc" numeric`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD "type_line" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "oracle_text" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "colors" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "color_identity" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "keywords" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "produced_mana" text array`,
    );
    await queryRunner.query(`ALTER TABLE "card" ADD "legalities" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD "games" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "rarity" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "set_code" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "set_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "collector_number" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "artist" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "border_color" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "card" ADD "frame" character varying`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD "full_art" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "foil" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "nonfoil" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD "reprint" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "card" ADD "prices" jsonb`);
    await queryRunner.query(`ALTER TABLE "card" ADD "raw" jsonb`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "card" ADD "name" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD "name" character varying(500) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "raw"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "prices"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "reprint"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "nonfoil"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "foil"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "full_art"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "frame"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "border_color"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "artist"`);
    await queryRunner.query(
      `ALTER TABLE "card" DROP COLUMN "collector_number"`,
    );
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "set_name"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "set_code"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "rarity"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "games"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "legalities"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "produced_mana"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "keywords"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "color_identity"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "colors"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "oracle_text"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "type_line"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "cmc"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "mana_cost"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "image_uris"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "layout"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "released_at"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "lang"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "oracle_id"`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD "dump" character varying NOT NULL`,
    );
  }
}
