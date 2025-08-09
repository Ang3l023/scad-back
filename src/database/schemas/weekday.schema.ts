import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from './timestamp.schema';
import { Schedule } from './schedule.schema';

@Entity({ name: 'weekdays' })
export class Weekday extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  cid: string;

  @Column()
  name: string;

  @Column()
  code: number;

  @OneToMany(() => Schedule, (schedule) => schedule.weekday)
  schedules: Schedule[];
}
