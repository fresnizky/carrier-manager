import { Field, InputType } from '@nestjs/graphql';
import { CarrierCode } from './carrier.entity';

@InputType()
export class CreateCarrierDTO {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  status: CarrierCode;

  @Field()
  phonenumber: string;
}
