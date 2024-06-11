import { Inject, UseFilters } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlHttpExceptionFilter } from 'src/common/filters/gql-http-exception.filter';
import { CarrierModel } from './carrier.model';
import { CarrierService } from './carrier.service';

@Resolver((of) => CarrierModel)
@UseFilters(GqlHttpExceptionFilter)
export class CarrierResolver {
  constructor(@Inject(CarrierService) private carrierService: CarrierService) {}

  @Query((returns) => [CarrierModel])
  async carriers(): Promise<CarrierModel[]> {
    return await this.carrierService.findAll();
  }
}
