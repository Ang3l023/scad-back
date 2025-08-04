import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './schedule.schema';
import { TimeStamp } from './timestamp.schema';
import { Exclude } from 'class-transformer';

@Entity({ name: 'headquarters' })
export class Headquarter extends TimeStamp {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cid: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Schedule, (schedule) => schedule.headquarter)
  schedules: Schedule[];
}
