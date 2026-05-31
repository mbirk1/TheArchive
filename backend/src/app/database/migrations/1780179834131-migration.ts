import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1780179834131 implements MigrationInterface {
    name = 'Migration1780179834131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "archive"."deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "archive"."deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "archive"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
