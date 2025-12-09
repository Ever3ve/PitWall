import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeDriversBirthdayNullable1765320202869 implements MigrationInterface {
    name = 'MakeDriversBirthdayNullable1765320202869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "birthday" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "birthday" SET NOT NULL`);
    }

}
