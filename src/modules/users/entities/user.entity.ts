import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: '20',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: '250',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: '15',
    nullable: false,
  })
  status: string;
}
