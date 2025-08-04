import { PartialType } from '@nestjs/swagger';
import { CreateHeadquarterDto } from './create.dto';

export class UpdateHeadquarterDto extends PartialType(CreateHeadquarterDto) {}
