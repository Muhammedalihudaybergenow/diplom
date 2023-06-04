import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LanguagesService } from '../service/languages.service';
import { CreateLanguageDto } from '../dto/create-language.dto';
import { UpdateLanguageDto } from '../dto/update-language.dto';
import { ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { LanguageQueryDto } from '../dto/language-query.dto';
@Controller({
  path: 'languages'
})
@ApiTags('Languages Controller')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @Permissions('languages.create')
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  @Permissions('languages.read')
  findAll(@Query() query: LanguageQueryDto) {
    return this.languagesService.findAll(query);
  }

  @Get(':id')
  @Permissions('languages.read')
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(+id);
  }

  @Patch(':id')
  @Permissions('languages.update')
  update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  @Permissions('languages.delete')
  remove(@Param('id') id: string) {
    return this.languagesService.remove(+id);
  }
}
