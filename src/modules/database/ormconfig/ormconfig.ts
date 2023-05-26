import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  database: process.env.POSTGRES_DATABASE_NAME,
  host: process.env.POSTGRES_DATABASE_HOST,
  port: parseInt(process.env.POSTGRES_DATABASE_PORT),
  username: process.env.POSTGRES_DATABASE_USERNAME,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  migrations: ['dist/modules/database/migrations/**/*.js'],
  entities: ['dist/modules/**/*.entity.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
