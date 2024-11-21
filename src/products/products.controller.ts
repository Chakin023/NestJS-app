import { Controller, Get } from '@nestjs/common';
import { UtilityService } from 'src/shared/utility/utility.service';

@Controller('products')
export class ProductsController {
  // when using use ***service*** not !module!
  constructor(private readonly utilityService: UtilityService) {}

  @Get('/') //localhost:PORT/products/
  findAll() {
    return [];
  }

  @Get('/date') //locahost:PORT/products/date
  getDate() {
    return {
      serverDate: this.utilityService.getServerData(),
    };
  }
}
