import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1718115322807 implements MigrationInterface {
    name = 'CreateUsers1718115322807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "image" character varying NOT NULL DEFAULT '', "username" character varying NOT NULL, "password" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
