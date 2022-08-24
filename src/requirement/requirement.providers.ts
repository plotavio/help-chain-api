import { DataSource } from 'typeorm';
import { Requirement } from './requirement.entity';

export const requirementProviders = [
  {
    provide: 'REQUIREMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Requirement),
    inject: ['DATA_SOURCE'],
  },
];