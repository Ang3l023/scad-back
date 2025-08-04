import { IsOptional, IsBoolean, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ERoles } from '../../../../common/enums/role.enum';

export class UserFilterDto {
  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsEnum(ERoles)
  @ApiPropertyOptional({ enum: ERoles })
  roles?: ERoles;
}
