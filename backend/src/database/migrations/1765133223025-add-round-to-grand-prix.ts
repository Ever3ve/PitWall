import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoundToGrandPrix1765133223025 implements MigrationInterface {
    name = 'AddRoundToGrandPrix1765133223025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grand_prix" ADD "round" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grand_prix" DROP COLUMN "round"`);
    }

}
