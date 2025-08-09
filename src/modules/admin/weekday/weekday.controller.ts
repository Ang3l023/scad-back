import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WeekdayService } from './weekday.service';
import { CreateWeekdayDto } from './dto/create-weekday.dto';
import { UpdateWeekdayDto } from './dto/update-weekday.dto';
import {
  OrderQueryDto,
  PaginationQueryDto,
  RelationsQueryDto,
} from '../../../common/dtos/query-param.dto';
import { WeekdayFilterDto } from './dto/weekday-filter.dto';
import { buildOrder } from '../../../common/utils/query-helpers';

@Controller('admin/weekday')
export class WeekdayController {
  constructor(private readonly weekdayService: WeekdayService) {}

  @Post()
  create(@Body() createWeekdayDto: CreateWeekdayDto) {
    return this.weekdayService.create(createWeekdayDto);
  }

  @Get()
  findAll(
    @Query() pagination: PaginationQueryDto,
    @Query() relations: RelationsQueryDto,
    @Query() order: OrderQueryDto,
    @Query() filters: WeekdayFilterDto,
  ) {
    return this.weekdayService.findAll({
      ...pagination,
      relations: relations.relations,
      order: buildOrder(order.orderBy, order.orderDir),
      filters,
    });
  }

  @Get(':cid')
  findOne(@Param('cid') cid: string) {
    return this.weekdayService.findOne(cid);
  }

  @Patch(':cid')
  update(
    @Param('cid') cid: string,
    @Body() updateWeekdayDto: UpdateWeekdayDto,
  ) {
    return this.weekdayService.update(cid, updateWeekdayDto);
  }

  @Delete(':cid')
  remove(@Param('cid') cid: string) {
    return this.weekdayService.remove(cid);
  }
}
