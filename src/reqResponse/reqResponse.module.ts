import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { reqResponseProviders } from './reqResponse.providers';
import { ReqResponseService } from './reqResponse.service';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...reqResponseProviders,
    ReqResponseService,
  ],
  exports: [ReqResponseService],
})
export class ReqResponseModule {}