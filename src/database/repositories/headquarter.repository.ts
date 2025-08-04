import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Headquarter } from '../schemas/headquarter.schema';

@Injectable()
export class HeadquarterRepository extends BaseRepository<Headquarter> {
  constructor(
    @InjectRepository(Headquarter)
    protected readonly repository: Repository<Headquarter>,
  ) {
    super(repository);
  }
}
