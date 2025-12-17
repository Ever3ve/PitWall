import { MigrationInterface, QueryRunner } from "typeorm";

export class FixConnections1764521004767 implements MigrationInterface {
    name = 'FixConnections1764521004767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grand_prix" DROP CONSTRAINT "FK_9aa1e79a3923db8a23f25ad44fe"`);
        await queryRunner.query(`ALTER TABLE "grand_prix" DROP CONSTRAINT "FK_ebdde0f57a9a05c0942c51fcabe"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_d799891d50e7ca683d6a72a7a7d"`);
        await queryRunner.query(`ALTER TABLE "session_result" DROP CONSTRAINT "FK_844299b4439f5de588ca855feea"`);
        await queryRunner.query(`ALTER TABLE "session_result" DROP CONSTRAINT "FK_0c828416e4b6efd7c63c8f52964"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_75fff8191175d00b7e4c88b7442"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_b4c9c40177645aee90e776ff607"`);
        await queryRunner.query(`ALTER TABLE "grand_prix" ADD CONSTRAINT "FK_9aa1e79a3923db8a23f25ad44fe" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "grand_prix" ADD CONSTRAINT "FK_ebdde0f57a9a05c0942c51fcabe" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_d799891d50e7ca683d6a72a7a7d" FOREIGN KEY ("grandPrixId") REFERENCES "grand_prix"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "session_result" ADD CONSTRAINT "FK_844299b4439f5de588ca855feea" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_result" ADD CONSTRAINT "FK_0c828416e4b6efd7c63c8f52964" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_75fff8191175d00b7e4c88b7442" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_b4c9c40177645aee90e776ff607" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_b4c9c40177645aee90e776ff607"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_75fff8191175d00b7e4c88b7442"`);
        await queryRunner.query(`ALTER TABLE "session_result" DROP CONSTRAINT "FK_0c828416e4b6efd7c63c8f52964"`);
        await queryRunner.query(`ALTER TABLE "session_result" DROP CONSTRAINT "FK_844299b4439f5de588ca855feea"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_d799891d50e7ca683d6a72a7a7d"`);
        await queryRunner.query(`ALTER TABLE "grand_prix" DROP CONSTRAINT "FK_ebdde0f57a9a05c0942c51fcabe"`);
        await queryRunner.query(`ALTER TABLE "grand_prix" DROP CONSTRAINT "FK_9aa1e79a3923db8a23f25ad44fe"`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_b4c9c40177645aee90e776ff607" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_75fff8191175d00b7e4c88b7442" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_result" ADD CONSTRAINT "FK_0c828416e4b6efd7c63c8f52964" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_result" ADD CONSTRAINT "FK_844299b4439f5de588ca855feea" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_d799891d50e7ca683d6a72a7a7d" FOREIGN KEY ("grandPrixId") REFERENCES "grand_prix"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grand_prix" ADD CONSTRAINT "FK_ebdde0f57a9a05c0942c51fcabe" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grand_prix" ADD CONSTRAINT "FK_9aa1e79a3923db8a23f25ad44fe" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
