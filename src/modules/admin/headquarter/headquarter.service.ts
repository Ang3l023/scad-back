import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { HeadquarterRepository } from '../../../database/repositories/headquarter.repository';
import { FindAllOptions } from '../../../database/repositories/base.repository';
import { User } from '../../../database/schemas/user.schema';
import { CreateHeadquarterDto } from './dtos/create.dto';
import { Headquarter } from '../../../database/schemas/headquarter.schema';

@Injectable()
export class HeadquarterService {
  constructor(private readonly headquarterRepository: HeadquarterRepository) {}

  async findAll(options: FindAllOptions<User>) {
    return await this.headquarterRepository.findAll(options);
  }

  async create(createDto: CreateHeadquarterDto): Promise<Headquarter> {
    return await this.headquarterRepository.create({
      ...createDto,
      cid: uuidV4(),
    });
  }
}
