// Import required decorators from TypeORM
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { JobApplication } from './JobApplication.entity';
import { Resume } from './Resume.entity';
import { Notification } from './Notification.entity';

// Define User table in the database
@Entity('users')
export class User {
  // Unique identifier using UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // User's email - marked as unique to prevent duplicates
  @Column({ unique: true })
  email: string;

  // User's hashed password
  @Column()
  password: string;

  // User's first name
  @Column()
  firstName: string;

  // User's last name
  @Column()
  lastName: string;

  // Optional phone number
  @Column({ nullable: true })
  phoneNumber: string;

  // Relationship: One user can have many job applications
  @OneToMany(() => JobApplication, application => application.user)
  jobApplications: JobApplication[];

  // Relationship: One user can have many resumes
  @OneToMany(() => Resume, resume => resume.user)
  resumes: Resume[];

  // Relationship: One user can have many notifications
  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  // Automatically set when record is created
  @CreateDateColumn()
  createdAt: Date;

  // Automatically updated when record is modified
  @UpdateDateColumn()
  updatedAt: Date;
} 