import type { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1731915839502 implements MigrationInterface {
  name = "Initial1731915839502";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "asset" (
                "id" SERIAL NOT NULL,
                "name" text,
                "description" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "document" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "fileId" integer,
                "assetId" integer,
                CONSTRAINT "REL_83b05a0107593613639d26106c" UNIQUE ("fileId"),
                CONSTRAINT "REL_7e0dcbd692cad465ea5e364722" UNIQUE ("assetId"),
                CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "file" (
                "id" SERIAL NOT NULL,
                "file" bytea NOT NULL,
                "filename" text NOT NULL,
                "mimeType" text NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "image" (
                "id" SERIAL NOT NULL,
                "name" text,
                "description" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "fileId" integer,
                "assetId" integer,
                CONSTRAINT "REL_dc68de0aaebfd1036f21e679ae" UNIQUE ("fileId"),
                CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "document"
            ADD CONSTRAINT "FK_83b05a0107593613639d26106ca" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "document"
            ADD CONSTRAINT "FK_7e0dcbd692cad465ea5e364722b" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "image"
            ADD CONSTRAINT "FK_dc68de0aaebfd1036f21e679aec" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "image"
            ADD CONSTRAINT "FK_d684f6ed3fa2801379535bdea71" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "image" DROP CONSTRAINT "FK_d684f6ed3fa2801379535bdea71"
        `);
    await queryRunner.query(`
            ALTER TABLE "image" DROP CONSTRAINT "FK_dc68de0aaebfd1036f21e679aec"
        `);
    await queryRunner.query(`
            ALTER TABLE "document" DROP CONSTRAINT "FK_7e0dcbd692cad465ea5e364722b"
        `);
    await queryRunner.query(`
            ALTER TABLE "document" DROP CONSTRAINT "FK_83b05a0107593613639d26106ca"
        `);
    await queryRunner.query(`
            DROP TABLE "image"
        `);
    await queryRunner.query(`
            DROP TABLE "file"
        `);
    await queryRunner.query(`
            DROP TABLE "document"
        `);
    await queryRunner.query(`
            DROP TABLE "asset"
        `);
  }
}
