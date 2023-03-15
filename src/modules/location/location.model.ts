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
  HasOne,
  BelongsToMany,
  BelongsTo,
} from "sequelize-typescript";
import Customer from "../customer/customer.model";
import LocationDTO from "./dto/location.dto";
//
@Table({ tableName: "locations", initialAutoIncrement: "1000" })
class Location extends Model<LocationDTO> {
  @Column
  loc_code: string;

  @Column
  loc_name: string;

  @Column
  loc_address: string;

  @Column
  loc_country: string;

  @Column
  loc_city: string;

  @Column
  loc_contact_person: string;

  @Column
  loc_contact_phone_number: string;

  @Column
  loc_telephone_number: string;

  @Column
  loc_fax_number: string;

  @Column
  loc_email: string;

  @Column
  loc_type: string;

  @ForeignKey(() => Customer)
  @Column({
    allowNull: false,
    references: {
      model: Customer,
      key: "account_number",
    },
  })
  account_number: string;

  @BelongsTo(() => Customer, { foreignKey: "account_number" })
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

export default Location;
