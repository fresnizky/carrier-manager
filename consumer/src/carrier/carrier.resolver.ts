import { Inject } from '@nestjs/common';
import { CarrierModel } from './carrier.model';
import { CarrierService } from './carrier.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

@Resolver((of) => CarrierModel)
export class CarrierResolver {
  constructor(@Inject(CarrierService) private carrierService: CarrierService) {}

  @Query((returns) => [CarrierModel])
  async carriers(): Promise<CarrierModel[]> {
    return await this.carrierService.findAll();
  }
}
