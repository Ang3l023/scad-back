import { Module } from '@nestjs/common';
import { WeekdayService } from './weekday.service';
import { WeekdayController } from './weekday.controller';
import { RepositoriesModule } from '../../../database/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [WeekdayController],
  providers: [WeekdayService],
})
export class WeekdayModule {}
