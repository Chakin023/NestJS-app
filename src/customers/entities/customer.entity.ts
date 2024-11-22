import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'customers',
  timestamps: false,
})
export class Customer extends Model {
  @Column({})
  fullName: string;

  @Column({})
  isActive: boolean;
}
