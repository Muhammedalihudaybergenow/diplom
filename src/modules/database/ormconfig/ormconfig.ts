import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import {LanguageSeed} from '../seeds/languages/languages.seed';
import { UserSeed } from '../seeds/users/users.seed';
import { RoleSeed } from '../seeds/roles/roles.seed';
import { UserRoleSeed } from '../seeds/users/user-role.seed';
import { PermissionSeed } from '../seeds/permissions/permissions.seed';
import { RolePermissionsSeed } from '../seeds/permissions/permissions-role.seed';
dotenv.config();
const dataSourceOption: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: process.env.POSTGRES_DATABASE_NAME,
  host: process.env.POSTGRES_DATABASE_HOST,
  port: parseInt(process.env.POSTGRES_DATABASE_PORT),
  username: process.env.POSTGRES_DATABASE_USERNAME,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  migrations: ['dist/modules/database/migrations/**/*.js'],
  entities: ['dist/modules/**/*.entity.js'],
  synchronize: false,
  seeds: [LanguageSeed,UserSeed,RoleSeed,UserRoleSeed,PermissionSeed,RolePermissionsSeed] ,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
