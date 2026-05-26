import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1778364681598 implements MigrationInterface {
  name = 'Migration1778364681598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "archive"."deck" ("id" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_99f8010303acab0edf8e1df24f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "archive"."card_decks_deck" ("cardId" uuid NOT NULL, "deckId" uuid NOT NULL, CONSTRAINT "PK_b22f54c08f237f716fd425e175f" PRIMARY KEY ("cardId", "deckId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_70a78feb927276fd56472dbe6b" ON "archive"."card_decks_deck" ("cardId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_17836567c71c0cf1827ebc5bdc" ON "archive"."card_decks_deck" ("deckId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."card_decks_deck" ADD CONSTRAINT "FK_70a78feb927276fd56472dbe6b8" FOREIGN KEY ("cardId") REFERENCES "archive"."card"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."card_decks_deck" ADD CONSTRAINT "FK_17836567c71c0cf1827ebc5bdce" FOREIGN KEY ("deckId") REFERENCES "archive"."deck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "archive"."card_decks_deck" DROP CONSTRAINT "FK_17836567c71c0cf1827ebc5bdce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."card_decks_deck" DROP CONSTRAINT "FK_70a78feb927276fd56472dbe6b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`,
    );
    await queryRunner.query(
      `DROP INDEX "archive"."IDX_17836567c71c0cf1827ebc5bdc"`,
    );
    await queryRunner.query(
      `DROP INDEX "archive"."IDX_70a78feb927276fd56472dbe6b"`,
    );
    await queryRunner.query(`DROP TABLE "archive"."card_decks_deck"`);
    await queryRunner.query(`DROP TABLE "archive"."deck"`);
  }
}
