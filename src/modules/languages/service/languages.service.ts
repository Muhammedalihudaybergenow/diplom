import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from '../dto/create-language.dto';
import { UpdateLanguageDto } from '../dto/update-language.dto';
import { LanguageRepository } from '../repositories/language.repository';
import { LanguageQueryDto } from '../dto/language-query.dto';

@Injectable()
export class LanguagesService {
  constructor(private languageRepo: LanguageRepository){

  }
  create(createLanguageDto: CreateLanguageDto) {
    return this.languageRepo.createAndSave(createLanguageDto)
  }

  findAll(dto: LanguageQueryDto) {
    return this.languageRepo.findAll(dto)
  }

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return this.languageRepo.createAndSave(updateLanguageDto,id)
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
