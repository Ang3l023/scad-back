import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { WeekDayRepository } from './weekday.repository';
import { HeadquarterRepository } from './headquarter.repository';
import { ScheduleRepository } from './schedule.repository';
import { AssistanceRepository } from './assistance.repository';
import { PermissionRepository } from './permission.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../schemas/user.schema';
import { Weekday } from '../schemas/weekday.schema';
import { Headquarter } from '../schemas/headquarter.schema';
import { Schedule } from '../schemas/schedule.schema';
import { Assistance } from '../schemas/assistance.schema';
import { Permission } from '../schemas/permission.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Weekday,
      Headquarter,
      Schedule,
      Assistance,
      Permission,
    ]),
  ],
  providers: [
    UserRepository,
    WeekDayRepository,
    HeadquarterRepository,
    ScheduleRepository,
    AssistanceRepository,
    PermissionRepository,
  ],
  exports: [
    UserRepository,
    WeekDayRepository,
    HeadquarterRepository,
    ScheduleRepository,
    AssistanceRepository,
    PermissionRepository,
  ],
})
export class RepositoriesModule {}
