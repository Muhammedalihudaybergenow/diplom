import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { TreeRepository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: TreeRepository<CategoryEntity>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    const { name, parentId } = createCategoryDto;
    const category = new CategoryEntity();
    category.name = name;
    if (parentId) {
      category.parent = new CategoryEntity({
        id: parentId,
      });
    }
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.findTrees();
  }

  findOne(id: number) {
    const category = new CategoryEntity({ id });
    return this.categoryRepo.findDescendantsTree(category);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { name, parentId } = updateCategoryDto;
    const category = new CategoryEntity({ id });
    if (name) {
      category.name = name;
    }
    if (parentId) {
      category.parent = new CategoryEntity({ id: parentId });
    }
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    const category = new CategoryEntity({ id });
    return this.categoryRepo.remove(category);
  }
}
