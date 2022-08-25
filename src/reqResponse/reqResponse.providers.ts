import { DataSource } from 'typeorm';
import { ReqResponse } from './reqResponse.entity';

export const reqResponseProviders = [
  {
    provide: 'REQRESPONSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ReqResponse),
    inject: ['DATA_SOURCE'],
  },
];