import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { Tag } from './tag.entity';
import { UserType } from '../../core/enum/enum';

@Entity()
export class User extends BaseModel {
  @Column()
  fullName: string;

  @Column()
  userName: string;

  @Column({
    type: 'enum',
    enum: UserType,
    array: true,
    default: [UserType.EDITOR],
  })
  userTypes: UserType[];

  @ManyToMany(() => Tag, (tag) => tag.users)
  @JoinTable()
  tags: Tag[];
}
