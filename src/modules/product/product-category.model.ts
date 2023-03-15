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
import Category from "../category/category.model";
import Product from "./product.model";
//
@Table({ tableName: "product_category", initialAutoIncrement: "1000" })
class ProductCategory extends Model {
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @ForeignKey(() => Category)
  @Column
  category_id: number;
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

export default ProductCategory;
