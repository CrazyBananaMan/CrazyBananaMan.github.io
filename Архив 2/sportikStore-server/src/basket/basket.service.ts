import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from './entities/basket.entity';
import { Product } from 'src/product/entities/product.entity'; 
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createBasket(user: User): Promise<Basket> {
    const basket = this.basketRepository.create();
    basket.user = user;
    return this.basketRepository.save(basket);
  }

  async addProductToBasket(basketId: number, productId: number): Promise<Basket> {
    const basket = await this.basketRepository.findOne({where: {
      id: basketId
    }, relations: {
      products: true
    }});
    const product = await this.productRepository.findOneByOrFail({id: productId});

    if (!basket.products) {
      basket.products = [];
    }

    basket.products.push(product);
    return this.basketRepository.save(basket);
  }

  async removeProductFromBasket(basketId: number, productId: number): Promise<Basket> {
    const basket = await this.basketRepository.findOne({where: {
        id: basketId
    }, relations: {
        products: true
    }});
    const productIndex = basket.products.findIndex((product) => +product.id === +productId);

    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${productId} not found in the basket`);
    }

    basket.products.splice(productIndex, 1);
    return this.basketRepository.save(basket);
  }

  async getBasketById(basketId: number) {
    const basket = await this.basketRepository.findOne({
      where: {
        id: basketId
      },
      relations: {
        products: true
      }
    })
    return basket
  }
}