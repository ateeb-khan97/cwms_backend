import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({ tableName: "vendor_tax", initialAutoIncrement: "1000" })
class VendorTax extends Model {
  @Column
  tax_group: string;

  @Column
  percentage: string;

  @Column
  type: string;
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
}

export default VendorTax;
