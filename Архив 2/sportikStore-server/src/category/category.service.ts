import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({where: {
        id: id
    }, relations: {
        products: true
    }});
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File): Promise<Category> {
    const category = this.categoryRepository.create({
        ...createCategoryDto,
        image: image ? image.filename : undefined
    });
    return this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, image: Express.Multer.File): Promise<Category> {
    const category = await this.findOne(id); // Проверка существования категории

    if(updateCategoryDto.image !== undefined) {
        category.image = image.filename
    }

    if(updateCategoryDto.name !== undefined) {
        category.name = updateCategoryDto.name
    }

    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Проверка существования категории
    await this.categoryRepository.delete(id);
  }
}