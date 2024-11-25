import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller({
  path: 'customers',
  version: '1',
})
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.create(createCustomerDto);
    return {
      data: customer,
      message: 'add data to database successfully',
    };
  }

  @Get() // localhost:4000/api/v1/customer
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id') // localhost:4000/api/v1/customer/:id
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id') // localhost:4000/api/v1/customer/:id
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.customersService.update(+id, updateCustomerDto);
    if (customer === 0) {
      throw new BadRequestException(
        `can't update data of customer with id ${id}`,
      );
    }
    return { message: 'update completed' };
  }

  @Delete(':id') // localhost:4000/api/v1/customer/:id
  async remove(@Param('id') id: string) {
    const customer = await this.customersService.remove(+id);
    if (customer === 0) {
      throw new NotFoundException(`not found customer with id ${id}`);
    }
    return { message: 'delete completed' };
  }
}
