import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  imports: [
    UserModule,
    BasketModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Тут напиши ключ (лучше dotenv юзать)
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}