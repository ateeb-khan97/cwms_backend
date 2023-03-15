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
} from "sequelize-typescript";

import Manufacturer from "../manufacturer/manufacturer.model";
import Vendor from "./vendor.model";

@Table({ tableName: "vendor_manufacturer", initialAutoIncrement: "1000" })
class VendorManufacturer extends Model {
  //
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @ForeignKey(() => Manufacturer)
  @Column
  manufacturer_id: number;

  @ForeignKey(() => Vendor)
  @Column
  vendor_id: number;
}

export default VendorManufacturer;
