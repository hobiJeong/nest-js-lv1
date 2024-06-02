import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;
}
