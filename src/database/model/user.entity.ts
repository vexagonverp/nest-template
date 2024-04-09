import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.entity';

@Entity()
export class User extends BaseModel {
  @Column()
  fullName: string;

  @Column()
  userName: string;
}
