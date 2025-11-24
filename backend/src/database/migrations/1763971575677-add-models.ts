import { MigrationInterface, QueryRunner } from "typeorm";

export class AddModels1763971575677 implements MigrationInterface {
    name = 'AddModels1763971575677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "track" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "lengthKm" double precision NOT NULL, "laps" integer NOT NULL, "turns" integer NOT NULL, "yearOpened" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "season" ("id" SERIAL NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grand_prix" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "trackId" integer, "seasonId" integer, CONSTRAINT "PK_0d1659547bad79a0bc84ce04620" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "principal" character varying NOT NULL, "firstSeason" integer NOT NULL, "lastSeason" integer, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "started" date NOT NULL, "ended" date, "driverId" integer, "teamId" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "birthday" date NOT NULL, "country" character varying NOT NULL, "fansCount" integer NOT NULL DEFAULT '0', "carNumber" integer NOT NULL, "firstRace" character varying, "firstWin" character varying, CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session_result" ("id" SERIAL NOT NULL, "points" integer NOT NULL, "position" integer NOT NULL, "fastestLap" character varying, "driverId" integer, "sessionId" integer, CONSTRAINT "PK_19c4eb96be149efb130a8f28eb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."session_type_enum" AS ENUM('fp1', 'fp2', 'fp3', 'quali', 'sprint_quali', 'sprint', 'race')`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "type" "public"."session_type_enum" NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "grandPrixId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "grand_prix" ADD CONSTRAINT "FK_9aa1e79a3923db8a23f25ad44fe" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grand_prix" ADD CONSTRAINT "FK_ebdde0f57a9a05c0942c51fcabe" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_75fff8191175d00b7e4c88b7442" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_b4c9c40177645aee90e776ff607" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_result" ADD CONSTRAINT "FK_844299b4439f5de588ca855feea" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_result" ADD CONSTRAINT "FK_0c828416e4b6efd7c63c8f52964" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_d799891d50e7ca683d6a72a7a7d" FOREIGN KEY ("grandPrixId") REFERENCES "grand_prix"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_d799891d50e7ca683d6a72a7a7d"`);
        await queryRunner.query(`ALTER TABLE "session_result" DROP CONSTRAINT "FK_0c828416e4b6efd7c63c8f52964"`);
        await queryRunner.query(`ALTER TABLE "session_result" DROP CONSTRAINT "FK_844299b4439f5de588ca855feea"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_b4c9c40177645aee90e776ff607"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_75fff8191175d00b7e4c88b7442"`);
        await queryRunner.query(`ALTER TABLE "grand_prix" DROP CONSTRAINT "FK_ebdde0f57a9a05c0942c51fcabe"`);
        await queryRunner.query(`ALTER TABLE "grand_prix" DROP CONSTRAINT "FK_9aa1e79a3923db8a23f25ad44fe"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TYPE "public"."session_type_enum"`);
        await queryRunner.query(`DROP TABLE "session_result"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "grand_prix"`);
        await queryRunner.query(`DROP TABLE "season"`);
        await queryRunner.query(`DROP TABLE "track"`);
    }

}
