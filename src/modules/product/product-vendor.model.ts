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
import Vendor from "../vendor/vendor.model";
import Product from "./product.model";
//
@Table({ tableName: "product_vendor", initialAutoIncrement: "1000" })
class ProductVendor extends Model {
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @ForeignKey(() => Vendor)
  @Column
  vendor_id: number;
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

export default ProductVendor;
