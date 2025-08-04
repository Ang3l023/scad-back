import { Module } from '@nestjs/common';
import { HeadquarterModule } from './headquarter/headquarter.module';

@Module({
  imports: [HeadquarterModule],
})
export class AdminModule {}
