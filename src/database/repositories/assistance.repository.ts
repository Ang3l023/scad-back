import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Assistance } from '../schemas/assistance.schema';

@Injectable()
export class AssistanceRepository extends BaseRepository<Assistance> {
  constructor(
    @InjectRepository(Assistance)
    protected readonly repository: Repository<Assistance>,
  ) {
    super(repository);
  }
}
