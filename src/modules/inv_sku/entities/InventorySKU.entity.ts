import {
  AutoIncrement,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import InventorySkuDto from "../dto/InventorySKU.dto";
import InventorySkuDetail from "./InventoryDetail.entity";

@Table({ tableName: "inward_sku", initialAutoIncrement: "1000" })
export default class InventorySku extends Model<InventorySkuDto> {
  @Unique
  @Column({ allowNull: true })
  inward_id: string;

  @Column({ allowNull: true })
  inward_date: string;

  @Column
  po_id: number;

  @Column
  product_id: number;

  @Column
  product_name: string;

  @Column
  required_quantity: string;

  @Column
  received_quantity: string;

  @Column
  maximum_retail_price: string;

  @Column
  trade_price: string;

  @Column
  discount_percentage: string;

  @Column
  batch_number: string;

  @Column
  batch_expiry: string;

  @Column
  comments: string;

  @Column
  foc: boolean;

  @Column
  uom: string;

  @Column
  location_id: string;

  @Column
  account_number: string;
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
  // relations
  @HasMany(() => InventorySkuDetail)
  inward_sku_detail: InventorySkuDetail;
}
