import { Inject } from '@nestjs/common';
import { CarrierModel } from './carrier.model';
import { CarrierService } from './carrier.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateCarrierDTO } from './carrier.dto';

@Resolver((of) => CarrierModel)
export class CarrierResolver {
  constructor(@Inject(CarrierService) private carrierService: CarrierService) {}

  @Query((returns) => [CarrierModel])
  async carriers(): Promise<CarrierModel[]> {
    return await this.carrierService.findAll();
  }

  @Mutation((returns) => CarrierModel)
  async createCarrier(
    @Args('carrier') carrier: CreateCarrierDTO,
  ): Promise<CarrierModel> {
    return await this.carrierService.create(carrier);
  }
}
