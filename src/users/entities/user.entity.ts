import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('bool', {
    default: true,
  })
  is_active: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert(): void {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate(): void {
    this.checkFieldsBeforeInsert();
  }
}
