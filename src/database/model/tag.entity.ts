import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Tag extends BaseModel {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.tags)
  users: User[];
}
