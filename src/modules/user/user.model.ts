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
  BelongsTo,
} from "sequelize-typescript";
import sequelize from "../../db_config";
import Customer from "../customer/customer.model";
import UserDTO from "./dto/user.dto";
//
type UserType = "admin" | "user";
//
@Table({ tableName: "users", initialAutoIncrement: "1000" })
class User extends Model<UserDTO> {
  @Column
  user_id: string;

  @Unique
  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Column
  user_name: string;

  @Unique
  @Column({ unique: true })
  phone_number: string;

  @Column
  type: UserType;

  @Column
  loc_code: string;

  @ForeignKey(() => Customer)
  @Column({
    allowNull: false,
    references: {
      model: Customer,
      key: "account_number",
    },
  })
  account_number: string;

  @BelongsTo(() => Customer, {
    constraints: false,
  })
  customer: Customer;

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

export default User;
