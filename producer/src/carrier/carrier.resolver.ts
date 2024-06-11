import { Inject, UseFilters } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlHttpExceptionFilter } from 'src/common/filters/gql-http-exception.filter';
import { CreateCarrierDTO } from './carrier.dto';
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

  @Mutation((returns) => CarrierModel)
  async createCarrier(
    @Args('carrier') carrier: CreateCarrierDTO,
  ): Promise<CarrierModel> {
    return await this.carrierService.create(carrier);
  }

  @Mutation((returns) => CarrierModel)
  async updateCarrier(
    @Args('carrierId') carrierId: number,
    @Args('carrier') carrier: CreateCarrierDTO,
  ): Promise<CarrierModel> {
    return await this.carrierService.update(carrierId, carrier);
  }
}
