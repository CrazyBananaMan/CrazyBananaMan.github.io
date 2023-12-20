import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseInterceptors, UploadedFile, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { multerConfig } from 'src/multer.config';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<any> {
    const products = await this.productService.getAllProducts();
    return { products };
  }

  @Get(':id')
  async getProductById(@Param('id') productId: number): Promise<any> {
    try {
      const product = await this.productService.getProductById(productId);
      return { product };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    const createdProduct = await this.productService.createProduct(createProductDto, image);
    return { message: 'Product created successfully', product: createdProduct };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Param('id') productId: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      const updatedProduct = await this.productService.updateProduct(productId, updateProductDto, image);
      return { message: 'Product updated successfully', product: updatedProduct };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') productId: number): Promise<any> {
    try {
      await this.productService.deleteProduct(productId);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}