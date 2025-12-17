import { MigrationInterface, QueryRunner } from "typeorm";

export class ExtendDriver1764538800147 implements MigrationInterface {
    name = 'ExtendDriver1764538800147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ADD "externalId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "UQ_cf53119f6c05d89a90384e311a2" UNIQUE ("externalId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "UQ_cf53119f6c05d89a90384e311a2"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "externalId"`);
    }

}
