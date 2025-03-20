// Import required decorators from TypeORM
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';

// Define Resume table in the database
@Entity('resumes')
export class Resume {
  // Unique identifier using UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Title/name of the resume
  @Column()
  fileName: string;

  // Actual content of the resume
  @Column()
  s3Key: string;

  // Version number for tracking resume iterations
  @Column()
  s3Url: string;

  // Optional path to stored resume file
  @Column({ type: 'text', nullable: true })
  description: string;

  // Relationship: Many resumes belong to one user
  @ManyToOne(() => User, user => user.resumes)
  user: User;

  // Automatically set when record is created
  @CreateDateColumn()
  createdAt: Date;

  // Automatically updated when record is modified
  @UpdateDateColumn()
  updatedAt: Date;
} 