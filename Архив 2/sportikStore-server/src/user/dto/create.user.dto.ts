import { IsString, IsEmail, MinLength } from 'class-validator';
import { Basket } from 'src/basket/entities/basket.entity';

export class CreateUserDto {

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  basket: Basket
}