import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Schedule } from '../schemas/schedule.schema';

@Injectable()
export class ScheduleRepository extends BaseRepository<Schedule> {
  constructor(
    @InjectRepository(Schedule)
    protected readonly repository: Repository<Schedule>,
  ) {
    super(repository);
  }
}
