import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Product } from 'src/product/entities/product.entity';
import { BasketController } from './basket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, Product])],
  providers: [BasketService],
  exports: [BasketService],
  controllers: [BasketController]
})
export class BasketModule {}
