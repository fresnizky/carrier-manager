import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { CarrierCode } from './carrier.entity';

@ObjectType()
export class CarrierModel {
  @Field()
  @Column('int', { primary: true })
  id: number;

  @Field()
  @Column('varchar', { length: 5 })
  code: string;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column('enum', { enum: CarrierCode, default: CarrierCode.NEW })
  status: CarrierCode;

  @Field()
  @Column('text')
  phonenumber: string;
}
