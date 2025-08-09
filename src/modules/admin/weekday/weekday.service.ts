import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeekdayDto } from './dto/create-weekday.dto';
import { UpdateWeekdayDto } from './dto/update-weekday.dto';
import { WeekDayRepository } from '../../../database/repositories/weekday.repository';
import { Weekday } from '../../../database/schemas/weekday.schema';
import { FindAllOptions } from '../../../database/repositories/base.repository';

@Injectable()
export class WeekdayService {
  constructor(private readonly weekdayRepository: WeekDayRepository) {}

  async create(createWeekdayDto: CreateWeekdayDto) {
    const weekday = await this.weekdayRepository.create(createWeekdayDto);
    return weekday;
  }

  async findAll(options: FindAllOptions<Weekday>) {
    return await this.weekdayRepository.findAll(options);
  }

  async findOne(cid: string) {
    const weekday = await this.weekdayRepository.findByCid(cid);

    if (!weekday) {
      throw new NotFoundException();
    }
    return weekday;
  }

  async update(cid: string, updateWeekdayDto: UpdateWeekdayDto) {
    const weekday = await this.findOne(cid);

    const weekdayUpdated = await this.weekdayRepository.updateOneById(
      weekday.id,
      updateWeekdayDto,
    );
    return weekdayUpdated!;
  }

  async remove(cid: string) {
    const weekday = await this.findOne(cid);

    await this.weekdayRepository.softDelete(weekday.id);
  }
}
