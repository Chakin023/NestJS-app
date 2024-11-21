import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalModule } from './shared/global/global.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ProductsModule, UtilityModule, GlobalModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
