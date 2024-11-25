import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerModel.create(
      createCustomerDto as Partial<Customer>,
    );
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.findAll({
      order: [['id', 'ASC']],
    });
  }

  async findOne(id: number) {
    const customer = await this.customerModel.findOne({ where: { id: id } });
    if (!customer) {
      throw new NotFoundException(`not found customer with id ${id}`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const [customer] = await this.customerModel.update(updateCustomerDto, {
      where: { id: id },
    });
    return customer;
  }

  async remove(id: number) {
    const customer = await this.customerModel.destroy({ where: { id: id } });
    return customer;
  }
}
