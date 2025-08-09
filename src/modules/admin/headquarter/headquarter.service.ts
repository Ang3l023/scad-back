import { Injectable, NotFoundException } from '@nestjs/common';
import { HeadquarterRepository } from '../../../database/repositories/headquarter.repository';
import { FindAllOptions } from '../../../database/repositories/base.repository';
import { CreateHeadquarterDto } from './dtos/create.dto';
import { Headquarter } from '../../../database/schemas/headquarter.schema';
import { UpdateHeadquarterDto } from './dtos/update.dto';

@Injectable()
export class HeadquarterService {
  constructor(private readonly headquarterRepository: HeadquarterRepository) {}

  async findAll(options: FindAllOptions<Headquarter>) {
    return await this.headquarterRepository.findAll(options);
  }

  async create(createDto: CreateHeadquarterDto): Promise<Headquarter> {
    return await this.headquarterRepository.create(createDto);
  }

  async findOne(cid: string): Promise<Headquarter | null> {
    const headquarter = await this.headquarterRepository.findByCid(cid);

    if (!headquarter) {
      throw new NotFoundException();
    }

    return headquarter;
  }

  async update(
    cid: string,
    updateDto: UpdateHeadquarterDto,
  ): Promise<Headquarter> {
    const headquarter = await this.findOne(cid);

    const updated = await this.headquarterRepository.updateOneById(
      headquarter!.id,
      updateDto,
    );

    return updated!;
  }

  async delete(cid: string): Promise<void> {
    const headquarter = await this.findOne(cid);

    await this.headquarterRepository.softDelete(headquarter!.id);
  }
}
