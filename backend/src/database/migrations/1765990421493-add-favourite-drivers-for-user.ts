import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavouriteDriversForUser1765990421493 implements MigrationInterface {
    name = 'AddFavouriteDriversForUser1765990421493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_driver" ("id" SERIAL NOT NULL, "userId" integer, "driverId" integer, CONSTRAINT "UQ_99daf63201dc637cbb3bb78fbf1" UNIQUE ("userId", "driverId"), CONSTRAINT "PK_1ff85813e4bfc6c81cb08958b27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "endTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_driver" ADD CONSTRAINT "FK_f27b63f9110002924275d93e1a7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_driver" ADD CONSTRAINT "FK_19733c93a6810f7261cbd84e965" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_driver" DROP CONSTRAINT "FK_19733c93a6810f7261cbd84e965"`);
        await queryRunner.query(`ALTER TABLE "favorite_driver" DROP CONSTRAINT "FK_f27b63f9110002924275d93e1a7"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "endTime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startTime" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "favorite_driver"`);
    }

}
