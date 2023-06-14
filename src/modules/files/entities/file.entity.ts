import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'files',
})
export class FileEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'path',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  path: string;

  @Column({
    name: 'mimetype',
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  mimetype: string;

  @Column({
    name: 'size',
    type: 'integer',
    nullable: false,
  })
  size: number;

  constructor(file?: Partial<FileEntity>) {
    Object.assign(this, file);
  }
}
