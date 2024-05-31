import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierService } from './carrier.service';
import { CarrierResolver } from './carrier.resolver';
import { Carrier } from './carrier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier])],
  providers: [CarrierService, CarrierResolver],
})
export class CarrierModule {}
