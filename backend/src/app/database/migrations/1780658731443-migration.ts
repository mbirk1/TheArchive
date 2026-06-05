import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1780658731443 implements MigrationInterface {
  name = 'Migration1780658731443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection" DROP CONSTRAINT "FK_4f925485b013b52e32f43d430f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection" ADD CONSTRAINT "FK_4f925485b013b52e32f43d430f6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "archive"."collection" DROP CONSTRAINT "FK_4f925485b013b52e32f43d430f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."collection" ADD CONSTRAINT "FK_4f925485b013b52e32f43d430f6" FOREIGN KEY ("user_id") REFERENCES "archive"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "archive"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
