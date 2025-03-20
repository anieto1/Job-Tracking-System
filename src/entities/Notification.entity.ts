// Import required decorators from TypeORM
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';
import { JobApplication } from './JobApplication.entity';

// Define Notification table in the database
@Entity('notifications')
export class Notification {
  // Unique identifier using UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Type of notification for categorization
  @Column()
  type: 'email' | 'sms' | 'app';

  // Title of the notification
  @Column()
  title: string;

  // Detailed message of the notification
  @Column({ type: 'text' })
  message: string;

  // Status of the notification
  @Column()
  status: 'pending' | 'sent' | 'failed';

  // Scheduled date for the notification
  @Column({ nullable: true })
  scheduledFor: Date;

  // Relationship: Many notifications belong to one user
  @ManyToOne(() => User, user => user.notifications)
  user: User;

  // Relationship: Many notifications belong to one job application
  @ManyToOne(() => JobApplication, { nullable: true })
  jobApplication: JobApplication;

  // Automatically set when record is created
  @CreateDateColumn()
  createdAt: Date;

  // Automatically set when record is updated
  @UpdateDateColumn()
  updatedAt: Date;
} 