import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalModule } from './shared/global/global.module';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Customer } from './customers/entities/customer.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    UtilityModule,
    GlobalModule,
    CustomersModule,
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [Customer, User],
      autoLoadModels: true,
      sync: { force: false, alter: true },
      pool: {
        //limit the connection to db (sequelize)
        max: 10, //max number of connection in pool
        min: 0, //min number of connection in pool
        idle: 30000, //connection life - 30 sec
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
