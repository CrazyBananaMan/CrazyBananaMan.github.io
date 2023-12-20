import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { BasketModule } from './basket/basket.module';
import { ProductModule } from './product/product.module';
import { Basket } from './basket/entities/basket.entity';
import { Product } from './product/entities/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { multerConfig } from './multer.config';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'sportik',
      synchronize: true,
      entities: [User, Basket, Product, Category]
    })
  }), BasketModule, ProductModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/public/images'
  }), MulterModule.register(multerConfig), CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
