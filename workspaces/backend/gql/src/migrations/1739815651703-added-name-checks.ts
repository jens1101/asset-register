import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNameChecks1739815651703 implements MigrationInterface {
  name = "AddedNameChecks1739815651703";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename existing check constraints to a better name
    await queryRunner.query(`
        ALTER TABLE "asset" DROP CONSTRAINT "CHK_3e5a3842bf811851f0d604953c"
    `);
    await queryRunner.query(`
        ALTER TABLE "asset" DROP CONSTRAINT "CHK_7178110dc3accaca578b74f25d"
    `);
    await queryRunner.query(`
        ALTER TABLE "asset"
        ADD CONSTRAINT "isUpperCase" CHECK (UPPER("valueCurrency") = "valueCurrency")
    `);
    await queryRunner.query(`
        ALTER TABLE "asset"
        ADD CONSTRAINT "isGreaterThanOrEqualTo" CHECK ("valueAmount" >= 0)
    `);

    // Add "isTrimmed" check constraint to the asset name. Existing names will
    // be trimmed.
    await queryRunner.query(`
        UPDATE "asset"
        SET "name" = TRIM("name")
    `);
    await queryRunner.query(`
        ALTER TABLE "asset"
        ADD CONSTRAINT "isTrimmed" CHECK (TRIM("name") = "name")
    `);

    // Add "isNonEmpty" check constraint to the asset name. Existing empty names
    // will be set to "No name".
    await queryRunner.query(`
        UPDATE "asset"
        SET "name" = 'No name'
        WHERE "name" = ''
    `);
    await queryRunner.query(`
        ALTER TABLE "asset"
        ADD CONSTRAINT "isNonEmpty" CHECK ("name" != '')
    `);

    // Add "isTrimmed" check constraint to the image name. Existing names will
    // be trimmed.
    await queryRunner.query(`
        UPDATE "image"
        SET "name" = TRIM("name")
    `);
    await queryRunner.query(`
        ALTER TABLE "image"
        ADD CONSTRAINT "isTrimmed" CHECK (TRIM("name") = "name")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "image" DROP CONSTRAINT "isTrimmed"
    `);
    await queryRunner.query(`
        ALTER TABLE "asset" DROP CONSTRAINT "isNonEmpty"
    `);
    await queryRunner.query(`
        ALTER TABLE "asset" DROP CONSTRAINT "isTrimmed"
    `);
    await queryRunner.query(`
        ALTER TABLE "asset" DROP CONSTRAINT "isGreaterThanOrEqualTo"
    `);
    await queryRunner.query(`
        ALTER TABLE "asset" DROP CONSTRAINT "isUpperCase"
    `);
    await queryRunner.query(`
        ALTER TABLE "asset"
        ADD CONSTRAINT "CHK_7178110dc3accaca578b74f25d" CHECK ("valueAmount" >= 0)
    `);
    await queryRunner.query(`
        ALTER TABLE "asset"
        ADD CONSTRAINT "CHK_3e5a3842bf811851f0d604953c" CHECK (upper("valueCurrency") = "valueCurrency")
    `);
  }
}
