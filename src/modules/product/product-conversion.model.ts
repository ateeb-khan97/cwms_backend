import {
  Table,
  Column,
  Model,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";
import { SellingUnitType } from "./dto/product-coversion.dto";
import Product from "./product.model";
//
@Table({ tableName: "product_conversion", initialAutoIncrement: "1000" })
class ProductConversion extends Model {
  @Column
  type: string;

  @Column
  selling_unit: SellingUnitType;

  @Column
  item_conversion: string;

  @Column
  sorting: number;

  @ForeignKey(() => Product)
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;
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

export default ProductConversion;
