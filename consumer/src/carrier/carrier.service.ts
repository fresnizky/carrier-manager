import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Carrier } from './carrier.entity';
import { CreateCarrierDTO } from './carrier.dto';
import { Kafka } from 'kafkajs';
import { Consumer } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class CarrierService implements OnModuleInit {
  private consumer: Consumer;
  constructor(
    @InjectRepository(Carrier)
    private carrierRepository: Repository<Carrier>,
  ) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'app-consumer',
      brokers: ['localhost:9092'],
    });
    this.consumer = kafka.consumer({ groupId: 'carrier-kafka' });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'carrier', fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const carrier = JSON.parse(message.value.toString());
        this.carrierRepository.save(carrier);
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }

  async findAll(): Promise<Carrier[]> {
    return await this.carrierRepository.find();
  }

  async create(carrier: CreateCarrierDTO): Promise<Carrier> {
    return await this.carrierRepository.save(carrier);
  }
}
