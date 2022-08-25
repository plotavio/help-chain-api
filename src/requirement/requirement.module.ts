import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { ReqResponseModule } from 'src/reqResponse/reqResponse.module';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from '../database/database.module';
import { RequirementController } from './requirement.controller';
import { requirementProviders } from './requirement.providers';
import { RequirementService } from './requirement.service';


@Module({
  imports: [DatabaseModule,
     AuthModule,
     PassportModule,
    UserModule,
  ReqResponseModule],
  controllers: [RequirementController],
  providers: [
    ...requirementProviders,
    RequirementService,
  ],
})
export class RequirementModule {}