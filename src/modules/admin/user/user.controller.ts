import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../../common/decorators/role.decorator';
import { ERoles } from '../../../common/enums/role.enum';
import {
  OrderQueryDto,
  PaginationQueryDto,
  RelationsQueryDto,
} from '../../../common/dtos/query-param.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { buildOrder } from '../../../common/utils/query-helpers';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('admin/user')
@Roles(ERoles.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationQueryDto,
    @Query() relations: RelationsQueryDto,
    @Query() order: OrderQueryDto,
    @Query() filters: UserFilterDto,
  ) {
    return this.userService.findAll({
      ...pagination,
      relations: relations.relations,
      order: buildOrder(order.orderBy, order.orderDir),
      filters,
    });
  }

  @Get(':cid')
  findOneByCid(@Param('cid') cid: string) {
    return this.userService.findOne(cid);
  }

  @Patch(':cid')
  updateOne(@Param('cid') cid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateOne(cid, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':cid')
  delete(@Param('cid') cid: string) {
    return this.userService.delete(cid);
  }
}
