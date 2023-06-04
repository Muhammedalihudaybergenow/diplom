import { Module } from '@nestjs/common';
import { LanguagesService } from './service/languages.service';
import { LanguagesController } from './controller/languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './entities/language.entity';
import { LanguageRepository } from './repositories/language.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [LanguagesController],
  providers: [LanguagesService,LanguageRepository]
})
export class LanguagesModule {}
