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
  BelongsToMany,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import Category from "../category/category.model";
import Manufacturer from "../manufacturer/manufacturer.model";
import Vendor from "../vendor/vendor.model";
import ProductDTO from "./dto/product.dto";
import { DiscountType } from "./dto/product.dto";
import ProductCategory from "./product-category.model";
import ProductConversion from "./product-conversion.model";
import ProductGenericFormula from "./product-generic_formula.model";
import ProductTag from "./product-tag.model";
import ProductVendor from "./product-vendor.model";
//
@Table({ tableName: "products", initialAutoIncrement: "1000" })
class Product extends Model<ProductDTO> {
  @Column
  product_name: string;

  @Column
  sku_description: string;

  @Column
  sku_department: string;

  @Column
  item_nature: string;

  @Column
  tax_code: string;

  @Column
  purchasing_unit: string;

  @Column
  trade_price: string;

  @Column
  discounted_price: string;

  @Column
  maximum_retail_price: string;

  @Column
  minimum_retail_price: string;

  @Column
  margin: string;

  @Column
  sku_minimum_level: string;

  @Column
  sku_maximum_level: string;

  @Column
  sku_reorder_level: string;

  @Column
  sku_warehouse_lead_time: string;

  @Column
  item_release_level: string;

  @Column
  price_levels: string;

  @Column
  stock_nature: string;

  @Column
  bar_code: string;

  @Column
  item_storage_location: string;

  @Column
  selling_discount: string;

  @Column
  item_tracking_level: string;

  @Column
  product_lifecycle: string;

  @Column
  quantity: string;

  @Column({ defaultValue: false })
  prescription_required: boolean;

  @Column
  drap_id: string;

  @Column
  side_effects: string;

  @Column
  sales_tax_group: string;

  @Column
  sales_tax_percentage: string;

  @Column
  dosage_instruction: string;

  @Column
  discount_type: DiscountType;

  @Column({ defaultValue: 0 })
  purchasing_price: number;

  @Column
  mrp_unit_price: number;

  @Column
  trade_discount: number;

  @Column
  comment: string;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];

  @BelongsToMany(() => Vendor, () => ProductVendor)
  vendors: Vendor[];

  @HasMany(() => ProductConversion)
  product_conversions: ProductConversion[];

  @HasMany(() => ProductGenericFormula)
  product_generic_formulas: ProductGenericFormula[];

  @HasMany(() => ProductTag)
  product_tags: ProductTag[];

  @Column
  @ForeignKey(() => Manufacturer)
  manufacturer_id: number;

  @BelongsTo(() => Manufacturer)
  manufacturer: Manufacturer;
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

export default Product;
