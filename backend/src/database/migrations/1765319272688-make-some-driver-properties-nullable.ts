import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeSomeDriverPropertiesNullable1765319272688 implements MigrationInterface {
    name = 'MakeSomeDriverPropertiesNullable1765319272688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "carNumber" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "carNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "country" SET NOT NULL`);
    }

}
