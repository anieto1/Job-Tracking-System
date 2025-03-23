// Import required decorators from TypeORM
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';

// Define JobApplication table in the database
@Entity('job_applications')
export class JobApplication {
  // Unique identifier using UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Name of the company being applied to
  @Column()
  companyName: string;

  // Job position title
  @Column()
  position: string;

  // Optional job description
  @Column({ type: 'text', nullable: true })
  description: string;

  // Current status of the application
  // Using union type to restrict possible values
  @Column()
  status: 'pending' | 'applied' | 'interviewing' | 'offered' | 'rejected';

  // Date when application was submitted
  @Column({ nullable: true })
  applicationDate: Date;

  // Relationship: Many applications belong to one user
  @ManyToOne(() => User, user => user.jobApplications)
  user: User;

  // Automatically set when record is created
  @CreateDateColumn()
  createdAt: Date;

  // Automatically updated when record is modified
  @UpdateDateColumn()
  updatedAt: Date;
} 