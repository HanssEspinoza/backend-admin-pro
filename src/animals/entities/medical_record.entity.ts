import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Animal } from './animal.entity';

@Entity('medical_record')
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  medical_record_id: string;

  @Column('text', {
    array: true,
    default: [null],
  })
  vaccines: string[];

  @Column('text', {
    array: true,
    default: [null],
  })
  allergies: string[];

  @Column('bool', {
    default: false,
  })
  treatment: boolean;

  @OneToOne(() => Animal, (animal) => animal.medical_record)
  animal: Animal;

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
