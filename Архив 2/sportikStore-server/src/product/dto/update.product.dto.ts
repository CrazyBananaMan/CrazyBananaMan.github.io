import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly price?: number;

  @IsOptional()
  readonly remainingQuantity?: number;

  readonly image?: string

  categoryId: string
}