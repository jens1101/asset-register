import type { MigrationInterface, QueryRunner } from "typeorm";

export class ImageUpdatedAt1732533846899 implements MigrationInterface {
  name = "ImageUpdatedAt1732533846899";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "image"
      ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
    `);

    await queryRunner.query(`
      UPDATE "image"
      SET "updatedAt" = "createdAt";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "image" DROP COLUMN "updatedAt"
    `);
  }
}
