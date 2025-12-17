import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGrandsPrixToDrivers1766005986726 implements MigrationInterface {
    name = 'AddGrandsPrixToDrivers1766005986726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "firstRace"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "firstWin"`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "firstGrandPrixId" integer`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "firstWinGrandPrixId" integer`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_00e7b41efe3b0347a300b4bc5eb" FOREIGN KEY ("firstGrandPrixId") REFERENCES "grand_prix"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_c4da44607176b2e565b9180fed4" FOREIGN KEY ("firstWinGrandPrixId") REFERENCES "grand_prix"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_c4da44607176b2e565b9180fed4"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_00e7b41efe3b0347a300b4bc5eb"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "firstWinGrandPrixId"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "firstGrandPrixId"`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "firstWin" character varying`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "firstRace" character varying`);
    }

}
