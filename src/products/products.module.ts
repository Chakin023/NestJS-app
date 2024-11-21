import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { UtilityModule } from 'src/shared/utility/utility.module';

// for global module no need to import
@Module({
  imports: [UtilityModule], //import: must import ***module*** not import !service!
  controllers: [ProductsController],
})
export class ProductsModule {}
