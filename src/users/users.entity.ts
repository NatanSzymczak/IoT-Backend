import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reading } from '../readings/readings.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Reading, (reading) => reading.user)
  readings: Reading[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;
}
