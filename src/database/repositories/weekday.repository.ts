import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Weekday } from '../schemas/weekday.schema';

@Injectable()
export class WeekDayRepository extends BaseRepository<Weekday> {
  constructor(
    @InjectRepository(Weekday)
    protected readonly repository: Repository<Weekday>,
  ) {
    super(repository);
  }
}
