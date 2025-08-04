import {
  IsOptional,
  IsArray,
  IsEnum,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;
}

export class RelationsQueryDto {
  @IsOptional()
  @IsArray()
  @Type(() => String)
  relations?: string[];
}

export class OrderQueryDto {
  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsEnum(SortDirection)
  orderDir?: SortDirection;
}
