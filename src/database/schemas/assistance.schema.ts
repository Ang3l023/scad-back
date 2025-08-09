import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EAssistanceState } from '../../common/enums/assistance-state.enum';
import { User } from './user.schema';
import { Permission } from './permission.schema';
import { TimeStamp } from './timestamp.schema';

@Entity({
  name: 'assistances',
})
export class Assistance extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  cid: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ type: 'time', nullable: false })
  entryTime: string;

  @Column({ type: 'time', nullable: false })
  departureTime: string;

  @Column({
    type: 'enum',
    enum: EAssistanceState,
    default: EAssistanceState.PRESENT,
  })
  state: EAssistanceState;

  @Column({ nullable: true })
  observations: string;

  @ManyToOne(() => User, (user) => user.assistances)
  users: User;

  @OneToMany(() => Permission, (permission) => permission.assistance)
  permissions: Permission[];
}
