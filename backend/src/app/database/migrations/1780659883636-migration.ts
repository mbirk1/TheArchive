import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1780659883636 implements MigrationInterface {
  name = 'Migration1780659883636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "archive"."collection" DROP CONSTRAINT "FK_4f925485b013b52e32f43d430f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`,
    );
    await queryRunner.query(
      `CREATE TABLE "archive"."collection_cards_card" ("collectionId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_607f35a8b19b485f7b22ff190a3" PRIMARY KEY ("collectionId", "cardId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a0bfe8a6059348dbb99d71fc9d" ON "archive"."collection_cards_card" ("collectionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2b7edc195840ad983ebd047791" ON "archive"."collection_cards_card" ("cardId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "archive"."deck_cards_card" ("deckId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_dcfd67e7964b5a18815c12739f3" PRIMARY KEY ("deckId", "cardId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0722f3114d3f770b07646af8ab" ON "archive"."deck_cards_card" ("deckId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd453408658286bec79a79c2af" ON "archive"."deck_cards_card" ("cardId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection" ADD CONSTRAINT "FK_4f925485b013b52e32f43d430f6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection_cards_card" ADD CONSTRAINT "FK_a0bfe8a6059348dbb99d71fc9dc" FOREIGN KEY ("collectionId") REFERENCES "archive"."collection"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection_cards_card" ADD CONSTRAINT "FK_2b7edc195840ad983ebd0477911" FOREIGN KEY ("cardId") REFERENCES "archive"."card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck_cards_card" ADD CONSTRAINT "FK_0722f3114d3f770b07646af8abc" FOREIGN KEY ("deckId") REFERENCES "archive"."deck"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck_cards_card" ADD CONSTRAINT "FK_bd453408658286bec79a79c2af1" FOREIGN KEY ("cardId") REFERENCES "archive"."card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "archive"."deck_cards_card" DROP CONSTRAINT "FK_bd453408658286bec79a79c2af1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck_cards_card" DROP CONSTRAINT "FK_0722f3114d3f770b07646af8abc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection_cards_card" DROP CONSTRAINT "FK_2b7edc195840ad983ebd0477911"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection_cards_card" DROP CONSTRAINT "FK_a0bfe8a6059348dbb99d71fc9dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection" DROP CONSTRAINT "FK_4f925485b013b52e32f43d430f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "archive"."IDX_bd453408658286bec79a79c2af"`,
    );
    await queryRunner.query(
      `DROP INDEX "archive"."IDX_0722f3114d3f770b07646af8ab"`,
    );
    await queryRunner.query(`DROP TABLE "archive"."deck_cards_card"`);
    await queryRunner.query(
      `DROP INDEX "archive"."IDX_2b7edc195840ad983ebd047791"`,
    );
    await queryRunner.query(
      `DROP INDEX "archive"."IDX_a0bfe8a6059348dbb99d71fc9d"`,
    );
    await queryRunner.query(`DROP TABLE "archive"."collection_cards_card"`);
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "archive"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection" ADD CONSTRAINT "FK_4f925485b013b52e32f43d430f6" FOREIGN KEY ("user_id") REFERENCES "archive"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
