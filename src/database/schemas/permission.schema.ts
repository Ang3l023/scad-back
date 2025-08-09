import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.schema';
import { TimeStamp } from './timestamp.schema';
import { Assistance } from './assistance.schema';

@Entity({ name: 'permissions' })
export class Permission extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  cid: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  reason: string;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.permissions)
  user: User;

  @ManyToOne(() => User, (user) => user.approved)
  approvedBy: User;

  @ManyToOne(() => Assistance, (assistance) => assistance.permissions)
  assistance: Assistance;
}
