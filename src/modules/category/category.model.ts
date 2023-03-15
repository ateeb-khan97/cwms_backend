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
} from "sequelize-typescript";
import ProductCategory from "../product/product-category.model";
import Product from "../product/product.model";
import CategoryDTO from "./dto/category.dto";
//
@Table({ tableName: "categories", initialAutoIncrement: "1000" })
class Category extends Model<CategoryDTO> {
  @Column
  category_level: string;

  @Column
  category_name: string;

  @Column
  category_description: string;

  @Column
  sorting: number;

  @Column
  category_image_url: string;

  @Column
  comment: string;

  @Column({ allowNull: true })
  parent_id: number;

  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[];
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

export default Category;
