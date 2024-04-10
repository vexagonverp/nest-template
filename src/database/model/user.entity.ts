import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { Tag } from './tag.entity';

@Entity()
export class User extends BaseModel {
  @Column()
  fullName: string;

  @Column()
  userName: string;

  @ManyToMany(() => Tag, (tag) => tag.users)
  @JoinTable()
  tags: Tag[];
}
