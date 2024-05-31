import { MigrationInterface, QueryRunner } from 'typeorm';

export class CarrierMigration1716982953501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE carrier_status AS ENUM ('new', 'active', 'pending');`,
    );

    await queryRunner.query(
      `CREATE TABLE carrier (
            id SERIAL PRIMARY KEY,
            code VARCHAR(5) NOT NULL,
            name TEXT NOT NULL,
            status carrier_status DEFAULT 'new'
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE carrier;`);
    await queryRunner.query(`DROP TYPE carrier_status;`);
  }
}
