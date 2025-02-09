import type { MigrationInterface, QueryRunner } from "typeorm";

export class AssetValue1738208438340 implements MigrationInterface {
  name = "AssetValue1738208438340";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create columns, initially allowing NULL values
    await queryRunner.query(`
      ALTER TABLE "asset"
      ADD "valueCurrency" character(3)
    `);

    await queryRunner.query(`
      ALTER TABLE "asset"
      ADD "valueAmount" numeric
    `);

    // Set the default values for the columns
    await queryRunner.query(`
      UPDATE "asset"
      SET "valueCurrency" = 'USD', "valueAmount" = 0
    `);

    // Add the `NOT NULL` constraints
    await queryRunner.query(`
      ALTER TABLE "asset"
      ALTER COLUMN "valueCurrency" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "asset"
      ALTER COLUMN "valueAmount" SET NOT NULL
    `);

    // Add check constraints
    await queryRunner.query(`
      ALTER TABLE "asset"
      ADD CONSTRAINT "CHK_3e5a3842bf811851f0d604953c" CHECK (upper("valueCurrency") = "valueCurrency")
   `);

    await queryRunner.query(`
      ALTER TABLE "asset"
      ADD CONSTRAINT "CHK_7178110dc3accaca578b74f25d" CHECK ("valueAmount" >= 0)
   `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "asset" DROP COLUMN "valueAmount"
    `);

    await queryRunner.query(`
      ALTER TABLE "asset" DROP COLUMN "valueCurrency"
    `);
  }
}
