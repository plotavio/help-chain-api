import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RequirementModule } from './requirement/requirement.module';

@Module({
  imports: [
    AuthModule,
    RequirementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
