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
import Product from "./product.model";
//
@Table({ tableName: "product_generic_formula", initialAutoIncrement: "1000" })
class ProductGenericFormula extends Model {
  @Column
  product_generic_formula: string;

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

export default ProductGenericFormula;
