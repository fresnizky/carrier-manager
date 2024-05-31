import { registerAs } from '@nestjs/config';
import { Carrier } from '../carrier/carrier.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'my-password',
  database: 'producer',
  entities: [Carrier],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
