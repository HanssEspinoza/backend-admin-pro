import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('animal')
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  animal_id: string;

  @Column('text')
  name: string;

  @Column('int')
  age: number;

  @Column('text')
  gender: 'M' | 'F';

  @Column('date')
  birth: Date;

  @Column('date')
  arrival: Date;

  @Column('text')
  health_condition: 'healthy' | 'sick' | 'injured';

  @Column('text')
  exhibit_status: 'exhibit' | 'quarantine';

  @Column('bool', {
    default: true,
  })
  is_alive: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
