import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { GlobalService } from 'src/shared/global/global.service';
import { UtilityService } from 'src/shared/utility/utility.service';

@Controller({
  path: 'products',
  version: '1', // for v1/PATH
})
export class ProductsController {
  // must constructor before using other service
  // when using use ***service*** not !module!
  constructor(
    private readonly utilityService: UtilityService,
    private readonly globalService: GlobalService,
  ) {}

  @Get('/') //localhost:PORT/v1/products/
  findAll() {
    return [];
  }

  @Get('/date') //locahost:PORT/v1/products/date
  getDate() {
    //if not know what type of error use HttpException
    //(error message, http status)
    // throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    return {
      serverDate: this.utilityService.getServerData(),
    };
  }

  @Version('2') //specific version for this method
  @Get('/thaiDate') //localhost:PORT/v2/products/thaiDate
  getThaiDate() {
    //using build in httpException
    //error message = description
    //message = first parameter
    // throw new BadRequestException('Something went wrong!', {
    //   cause: new Error(),
    //   description: 'Bad Request!',
    // });
    return {
      thaiDate: this.globalService.getServerThaiDate(),
    };
  }
}
