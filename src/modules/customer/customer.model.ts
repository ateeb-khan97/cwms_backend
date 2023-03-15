import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import Location from "../location/location.model";
import User from "../user/user.model";
import CustomerDTO from "./dto/customer.dto";
//
@Table({ tableName: "customers", initialAutoIncrement: "1000" })
class Customer extends Model<CustomerDTO> {
  @Column
  customer_name: string;

  @Unique
  @Column({ unique: true })
  account_number: string;

  @Column
  city: string;

  @Column
  owner_name: string;

  @HasMany(() => User)
  user: User[];

  @HasMany(() => Location)
  location: Location[];
  //
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Column({ allowNull: false, defaultValue: false })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
//
//
export default Customer;
