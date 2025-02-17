import type { MigrationInterface, QueryRunner } from "typeorm";

export class NameNotEmpty1739760811021 implements MigrationInterface {
  name = "NameNotEmpty1739760811021";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "asset"
      ADD CONSTRAINT "CHK_eedc969ff1419d624e9c360f66" CHECK (TRIM("name") != '')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "asset" DROP CONSTRAINT "CHK_eedc969ff1419d624e9c360f66"
    `);
  }
}
