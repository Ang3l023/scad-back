import { Module } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterController } from './headquarter.controller';
import { RepositoriesModule } from '../../../database/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [HeadquarterController],
  providers: [HeadquarterService],
})
export class HeadquarterModule {}
