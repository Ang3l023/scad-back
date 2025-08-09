import { PartialType } from '@nestjs/swagger';
import { CreateWeekdayDto } from './create-weekday.dto';

export class UpdateWeekdayDto extends PartialType(CreateWeekdayDto) {}
