import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  Admin,
  Producer,
} from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';
import { CreateCarrierDTO } from './carrier.dto';
import { Carrier } from './carrier.entity';

@Injectable()
export class CarrierService implements OnModuleInit {
  private admin: Admin;
  private producer: Producer;
  constructor(
    @InjectRepository(Carrier)
    private carrierRepository: Repository<Carrier>,
  ) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'app-producer',
      brokers: ['localhost:9092'],
    });
    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();

    this.producer = kafka.producer();
    await this.producer.connect();

    if (!topics.includes('carrier')) {
      await this.admin.createTopics({
        topics: [{ topic: 'carrier' }],
      });
    }

    if (!topics.includes('update-carrier')) {
      await this.admin.createTopics({
        topics: [{ topic: 'update-carrier' }],
      });
    }
  }

  async findAll(): Promise<Carrier[]> {
    return await this.carrierRepository.find();
  }

  async create(carrier: CreateCarrierDTO): Promise<Carrier> {
    await this.producer.send({
      topic: 'carrier',
      messages: [{ value: JSON.stringify({ carrier, action: 'create' }) }],
    });

    return await this.carrierRepository.save(carrier);
  }

  async update(carrierId: number, carrier: CreateCarrierDTO): Promise<Carrier> {
    Logger.log(`Updating carrier with id: ${carrierId}`);
    Logger.log(
      `Carrier: ${JSON.stringify({ carrier, carrierId, action: 'update' })}`,
    );
    await this.producer.send({
      topic: 'carrier',
      messages: [
        { value: JSON.stringify({ carrier, carrierId, action: 'update' }) },
      ],
    });

    await this.carrierRepository.update(carrierId, carrier);

    return await this.carrierRepository.findOne({ where: { id: carrierId } });
  }
}
