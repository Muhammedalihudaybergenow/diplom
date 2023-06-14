import { FileEntity } from '../entities/file.entity';

export class FileResponseDto {
  id: number;
  path: string;
  mimetype: string;
  size: number;
  constructor(file: FileEntity) {
    this.id = file.id;
    this.path = `localhost:3001/${file.path}`;
    this.mimetype = file.mimetype;
    this.size = file.size;
  }
}
