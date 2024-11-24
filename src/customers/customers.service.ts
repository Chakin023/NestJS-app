import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return createCustomerDto;
  }

  async findAll() {
    return await this.customerModel.findAll();
  }

  async findOne(id: number) {
    return await this.customerModel.findOne({ where: { id: id } });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return updateCustomerDto;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
