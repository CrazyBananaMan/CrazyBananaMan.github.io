import { Controller, Param, Post, Delete, Body, NotFoundException, Get } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post(':basketId/add-product/:productId')
  async addProductToBasket(
    @Param('basketId') basketId: number,
    @Param('productId') productId: number,
  ): Promise<any> {
    try {
      const updatedBasket = await this.basketService.addProductToBasket(basketId, productId);
      return { message: 'Product added to the basket', basket: updatedBasket };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':basketId/remove-product/:productId')
  async removeProductFromBasket(
    @Param('basketId') basketId: number,
    @Param('productId') productId: number,
  ): Promise<any> {
    try {
      const updatedBasket = await this.basketService.removeProductFromBasket(basketId, productId);
      return { message: 'Product removed from the basket', basket: updatedBasket };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  async getBasket(@Param('id') basketId: number) {
    return await this.basketService.getBasketById(basketId)
  }
}