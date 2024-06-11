import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717942408271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE carrier ADD COLUMN phonenumber VARCHAR(20);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE carrier DROP COLUMN phonenumber;');
  }
}
