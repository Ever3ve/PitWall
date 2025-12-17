import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeSessionTimesNullable1765372947617 implements MigrationInterface {
    name = 'MakeSessionTimesNullable1765372947617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startTime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "endTime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "endTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startTime" SET NOT NULL`);
    }

}
