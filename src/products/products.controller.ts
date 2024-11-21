import { Controller, Get } from '@nestjs/common';
import { GlobalService } from 'src/shared/global/global.service';
import { UtilityService } from 'src/shared/utility/utility.service';

@Controller('products')
export class ProductsController {
  // must constructor before using other service
  // when using use ***service*** not !module!
  constructor(
    private readonly utilityService: UtilityService,
    private readonly globalService: GlobalService,
  ) {}

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

  @Get('/thaiDate')
  getThaiDate() {
    return {
      thaiDate: this.globalService.getServerThaiDate(),
    };
  }
}
