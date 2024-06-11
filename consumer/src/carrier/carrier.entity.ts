import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CarrierCode {
  'NEW' = 'new',
  'ACTIVE' = 'active',
  'PENDING' = 'pending',
}

@Entity()
export class Carrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 5 })
  code: string;

  @Column('text')
  name: string;

  @Column({ type: 'enum', enum: CarrierCode, default: CarrierCode.NEW })
  status: CarrierCode;

  @Column('varchar', { length: 20 })
  phonenumber: string;
}
