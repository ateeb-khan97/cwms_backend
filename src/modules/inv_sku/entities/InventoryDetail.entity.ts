import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import InventorySkuDetailDto from "../dto/InventorySkuDetail.dto";
import InventorySku from "./InventorySKU.entity";
//
@Table({ tableName: "inward_detail", initialAutoIncrement: "1000" })
export default class InventorySkuDetail extends Model<InventorySkuDetailDto> {
  @Column
  inward_id: string;

  @Column
  inward_child: string;

  @Column
  product_id: string;

  @Column
  second_level: string;

  @Column
  third_level: string;

  @Column
  bin_id: string;

  @Column
  sku_date: Date;

  @Column
  user_name: string;

  @Column
  restack_date: string;

  @Column
  pick_list_id: string;

  @Column
  qc_status: boolean;

  @Column
  qc_date: Date;

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

  //relations
  @ForeignKey(() => InventorySku)
  inward_id_key: number;

  @BelongsTo(() => InventorySku)
  inward_sku: InventorySku;
}
