import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true, name: 'unique_email_constraint' }) // Specify a custom name for the unique constraint
  email: string;

  // @Column() // Specify a custom name for the unique constraint
  // email: string;

  @Column()
  gender: string;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column()
  permanentAddress: string;

  @Column()
  currentAddress: string;

  @Column()
  district: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  year: number;

  @Column()
  className: string;

  @Column()
  age: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: 'active' }) // Default status is 'active'
  status: string;
}
