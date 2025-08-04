import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterFilterDto } from './dtos/headquarter-filter.dto';
import {
  OrderQueryDto,
  PaginationQueryDto,
  RelationsQueryDto,
} from '../../../common/dtos/query-param.dto';
import { buildOrder } from '../../../common/utils/query-helpers';
import { CreateHeadquarterDto } from './dtos/create.dto';

@Controller('admin/headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Get()
  async findAll(
    @Query() pagination: PaginationQueryDto,
    @Query() relations: RelationsQueryDto,
    @Query() order: OrderQueryDto,
    @Query() filters: HeadquarterFilterDto,
  ) {
    return this.headquarterService.findAll({
      ...pagination,
      relations: relations.relations,
      order: buildOrder(order.orderBy, order.orderDir),
      filters,
    });
  }

  @Post()
  async create(@Body() createDto: CreateHeadquarterDto) {
    return this.headquarterService.create(createDto);
  }
}
