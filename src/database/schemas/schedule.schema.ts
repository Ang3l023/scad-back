import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Weekday } from './weekday.schema';
import { User } from './user.schema';
import { Headquarter } from './headquarter.schema';
import { TimeStamp } from './timestamp.schema';

@Entity({ name: 'schedules' })
export class Schedule extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  cid: string;

  @ManyToOne(() => Weekday, (weekday) => weekday.schedules)
  weekday: Weekday;

  @Column({ type: 'time' })
  entryTime: string;

  @Column({ type: 'time' })
  departureTime: string;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;

  @ManyToOne(() => Headquarter, (headquarter) => headquarter.schedules)
  headquarter: Headquarter;
}
