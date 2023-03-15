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
import Product from "../product/product.model";
import VendorManufacturer from "../vendor/vendor-manufacturer.model";
import Vendor from "../vendor/vendor.model";
import ManufacturerDTO from "./dto/manufacturer.dto";
//
@Table({ tableName: "manufacturers", initialAutoIncrement: "1000" })
class Manufacturer extends Model<ManufacturerDTO> {
  @Column
  manufacturer_name: string;

  @Column
  line_of_business: string;

  @Column
  comment: string;

  @BelongsToMany(() => Vendor, () => VendorManufacturer)
  vendors: Vendor[];

  @HasOne(() => Product)
  product: Product;
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

export default Manufacturer;
