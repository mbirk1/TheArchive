import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1780655304161 implements MigrationInterface {
  name = 'Migration1780655304161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`,
    );
    await queryRunner.query(
      `CREATE TABLE "archive"."collection" ("id" uuid NOT NULL, CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "archive"."card_collections_deck" ("cardId" uuid NOT NULL, "deckId" uuid NOT NULL, CONSTRAINT "PK_9749098486f384fb01bc5a1ea56" PRIMARY KEY ("cardId", "deckId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_352a71d8f83eb2522fcdd2d9f2" ON "archive"."card_collections_deck" ("cardId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cda9789d7699bfbff89372634a" ON "archive"."card_collections_deck" ("deckId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."card_collections_deck" ADD CONSTRAINT "FK_352a71d8f83eb2522fcdd2d9f2e" FOREIGN KEY ("cardId") REFERENCES "archive"."card"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."card_collections_deck" ADD CONSTRAINT "FK_cda9789d7699bfbff89372634a5" FOREIGN KEY ("deckId") REFERENCES "archive"."deck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "archive"."card_collections_deck" DROP CONSTRAINT "FK_cda9789d7699bfbff89372634a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."card_collections_deck" DROP CONSTRAINT "FK_352a71d8f83eb2522fcdd2d9f2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`,
    );
    await queryRunner.query(
      `DROP INDEX "archive"."IDX_cda9789d7699bfbff89372634a"`,
    );
    await queryRunner.query(
      `DROP INDEX "archive"."IDX_352a71d8f83eb2522fcdd2d9f2"`,
    );
    await queryRunner.query(`DROP TABLE "archive"."card_collections_deck"`);
    await queryRunner.query(`DROP TABLE "archive"."collection"`);
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "archive"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
