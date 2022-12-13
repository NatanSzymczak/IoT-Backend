import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'smallint', default: 0.0 })
  temperature: number;

  @Column({ nullable: false, type: 'smallint', default: 0.0 })
  pressure: number;

  @Column({ nullable: false, type: 'smallint', default: 0.0 })
  flow: number;

  @Column({ nullable: false, type: 'float4', default: 0.0 })
  pH: number;
}
