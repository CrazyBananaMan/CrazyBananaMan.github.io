import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from 'src/user/dto/login.user.dto';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { BasketService } from 'src/basket/basket.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly basketService: BasketService
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.getUserByEmail(loginUserDto.email);

    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    try {
      // Проверяем, не существует ли уже пользователь с таким email
      const existingUser = await this.userService.getUserByEmail(createUserDto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
  
      // Хешируем пароль перед сохранением в базу данных
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
      // Создаем нового пользователя
      const newUser = await this.userService.createUser({
        ...createUserDto,
        password: hashedPassword,
      });

      const basket = await this.basketService.createBasket(newUser)

      newUser.basket = basket

      this.userService.updateUser(newUser.id, {email: newUser.email, password: newUser.password, basket: newUser.basket})

  
      // Генерируем JWT токен
      const token = this.generateToken(newUser);
  
      // Возвращаем данные пользователя без пароля и токен
      return { access_token: token };
    } catch (error) {
      throw new ConflictException('Error during user registration');
    }
  }
  
  private generateToken(user: User): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}