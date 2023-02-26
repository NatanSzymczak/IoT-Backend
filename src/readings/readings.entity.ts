import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.readings)
  user: User;

  @CreateDateColumn()
  timestamp: number;

  @Column({ nullable: false, type: 'smallint', default: 0.0 })
  temperature: number;

  @Column({ nullable: false, type: 'smallint', default: 0.0 })
  pressure: number;

  @Column({ nullable: false, type: 'smallint', default: 0.0 })
  flow: number;

  @Column({ nullable: false, type: 'float4', default: 0.0 })
  pH: number;
}
