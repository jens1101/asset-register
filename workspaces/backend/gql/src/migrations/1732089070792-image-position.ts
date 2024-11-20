import type { MigrationInterface, QueryRunner } from "typeorm";

export class ImagePosition1732089070792 implements MigrationInterface {
  name = "ImagePosition1732089070792";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "image"
      ADD "position" numeric
    `);

    await queryRunner.query(`
      CREATE TEMP SEQUENCE "positionSerial" START 0 MINVALUE 0
    `);

    const assets: { assetId: number }[] = await queryRunner.query(`
      SELECT DISTINCT "assetId" FROM "image"
    `);

    for (const { assetId } of assets) {
      await queryRunner.query(
        `
          UPDATE "image"
          SET "position" = nextval('"positionSerial"')
          WHERE "assetId" = $1;
        `,
        [assetId],
      );

      await queryRunner.query(`
        ALTER SEQUENCE "positionSerial" RESTART;
      `);
    }

    await queryRunner.query(`
      ALTER TABLE "image"
      ALTER COLUMN "position" SET NOT NULL
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_a819114e63662bb22395870ce1" ON "image" ("assetId", "position")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "public"."IDX_a819114e63662bb22395870ce1"
    `);
    await queryRunner.query(`
      ALTER TABLE "image" DROP COLUMN "position"
    `);
  }
}
