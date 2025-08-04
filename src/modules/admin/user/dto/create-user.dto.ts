import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ERoles } from '../../../../common/enums/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ enum: ERoles, default: ERoles.EMPLOYEE })
  @IsOptional()
  @IsEnum(ERoles)
  role: ERoles = ERoles.EMPLOYEE;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active: boolean;
}
