import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Basket } from 'src/basket/entities/basket.entity';

export class UpdateCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  image?: string;

}