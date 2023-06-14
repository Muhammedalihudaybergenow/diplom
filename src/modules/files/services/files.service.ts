import { Injectable } from '@nestjs/common';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { FileRepository } from '../repositories/file.repository';
import * as fs from 'fs';
import { QueryFilesDto } from '../dto/query-file.dto';
import { FileResponseDto } from '../dto/files-response.dto';
@Injectable()
export class FilesService {
  constructor(private fileRepository: FileRepository) {}
  create(files: Express.Multer.File[]) {
    return this.fileRepository.createAndSave(files);
  }

  async findAll(dto: QueryFilesDto) {
    const [files, total] = await this.fileRepository.findAll(dto);
    return {
      files: files.map((file) => new FileResponseDto(file)),
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOneBy({
      id,
    });
    const result = fs.unlinkSync(file.path);
    return this.fileRepository.remove(file);
  }
}
