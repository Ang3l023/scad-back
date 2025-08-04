import { Module } from '@nestjs/common';
import { HeadquarterModule } from './headquarter/headquarter.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [HeadquarterModule, AuthModule, UserModule],
})
export class AdminModule {}
