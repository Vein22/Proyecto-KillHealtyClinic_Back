import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1741656150840 implements MigrationInterface {
    name = 'Initial1741656150840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "Dni" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_93ac0adea578f477b5cad2fdd5c" UNIQUE ("Dni")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "adress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_5ec2ef3bc1dbd9be034ea9c1b59" UNIQUE ("adress")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_5ec2ef3bc1dbd9be034ea9c1b59"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "adress"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_93ac0adea578f477b5cad2fdd5c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "Dni"`);
    }

}
