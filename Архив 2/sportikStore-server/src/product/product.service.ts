import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryServie: CategoryService
  ) {}
  async createProduct(createProductDto: CreateProductDto, image: Express.Multer.File): Promise<Product> {
    const category = await this.categoryServie.findOne(+createProductDto.categoryId)
    const product = this.productRepository.create({
      ...createProductDto,
      price: Number(createProductDto.price), // Преобразование в число
      remainingQuantity: Number(createProductDto.remainingQuantity), // Преобразование в число
      image: image ? image.filename : undefined,
      category: category
    });

    return this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({where: {
        id: productId
    }, relations: {
        category: true
    }});

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return product;
  }
  async updateProduct(productId: number, updateProductDto: UpdateProductDto, image: Express.Multer.File): Promise<Product> {
    const product = await this.getProductById(productId);

    if (updateProductDto.price !== undefined) {
      // Преобразование в число, если значение не undefined
      product.price = Number(updateProductDto.price);
    }

    if (updateProductDto.categoryId !== undefined) {
        // Преобразование в число, если значение не undefined
        product.category = await this.categoryServie.findOne(+updateProductDto.categoryId)
      }

    if (updateProductDto.remainingQuantity !== undefined) {
      // Преобразование в число, если значение не undefined
      product.remainingQuantity = Number(updateProductDto.remainingQuantity);
    }

    if (updateProductDto.image && image) {
      product.image = image.filename;
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async deleteProduct(productId: number): Promise<void> {
    const product = await this.getProductById(productId);
    await this.productRepository.remove(product);
  }
}