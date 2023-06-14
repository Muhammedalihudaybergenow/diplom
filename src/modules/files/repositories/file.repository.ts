import { DataSource, Repository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';
import { Injectable } from '@nestjs/common';
import { QueryFilesDto } from '../dto/query-file.dto';

@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(private dataSource: DataSource) {
    super(FileEntity, dataSource.createEntityManager());
  }

  createAndSave(files: Express.Multer.File[]) {
    const entities = files.map(
      (file) =>
        new FileEntity({
          mimetype: file.mimetype,
          path: file.path,
          size: file.size,
        }),
    );
    return this.save(entities);
  }
  findAll(dto: QueryFilesDto) {
    let { limit, skip, search, orderBy, orederDirections } = dto;

    const query = this.createQueryBuilder('files');

    if (search) {
      query.andWhere('files.path ILIKE (:search)', { search: `%${search}%` });
    }
    return query
      .take(limit)
      .skip((skip - 1) * limit)
      .orderBy(orderBy, orederDirections)
      .getManyAndCount();
  }
}
