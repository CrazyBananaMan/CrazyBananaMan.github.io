import { Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { multerConfig } from 'src/multer.config';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() image: Express.Multer.File) {
    return this.categoryService.create(createCategoryDto, image);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFile() image: Express.Multer.File) {
    return this.categoryService.update(+id, updateCategoryDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
        this.categoryService.remove(+id);
        return { message: 'Category deleted successfully' };
    } catch(error) {
        throw new NotFoundException(error.message);
    }

    
  }
}