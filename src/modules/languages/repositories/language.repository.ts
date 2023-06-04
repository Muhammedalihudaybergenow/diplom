import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { LanguageEntity } from "../entities/language.entity";
import { UpdateLanguageDto } from "../dto/update-language.dto";
import { LanguageQueryDto } from "../dto/language-query.dto";


@Injectable()
export class LanguageRepository extends Repository<LanguageEntity> {
    constructor(private dataSource: DataSource) {
        super(LanguageEntity,dataSource.createEntityManager());
    }

    createAndSave(dto: UpdateLanguageDto,id?:number){
        const entity = new LanguageEntity(dto);
        if(id){
            entity.id = id
        }
        return this.save(entity);
    }

    findAll(dto: LanguageQueryDto){
        const {limit,orderBy,orderDirection,search,skip} = dto;
        const query = this.createQueryBuilder('languages')
        if(search){
            query.where('languages.name ILIKE (:search)',{search: `%${search}%`})
        }

        return query
        .take(limit)
        .skip((skip-1)*limit)
        .orderBy(orderBy, orderDirection)
        .getManyAndCount()
    }
}