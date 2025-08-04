import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ERoles } from '../../common/enums/role.enum';
import { TimeStamp } from './timestamp.schema';
import { Assistance } from './assistance.schema';
import { Permission } from './permission.schema';
import { Schedule } from './schedule.schema';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'users',
})
export class User extends TimeStamp {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ default: ERoles.EMPLOYEE, enum: ERoles, type: 'enum' })
  role: ERoles;

  @Column({ default: true, type: 'boolean' })
  active: boolean;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  @OneToMany(() => Assistance, (assistance) => assistance.users)
  assistances: Assistance[];

  @OneToMany(() => Permission, (permission) => permission.user)
  permissions: Permission[];

  @OneToMany(() => Permission, (permission) => permission.approvedBy)
  approved: Permission[];

  isPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
