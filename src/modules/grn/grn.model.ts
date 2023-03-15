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
import GrnDTO from "./dto/grn.dto";
//
@Table({ tableName: "grn", initialAutoIncrement: "1000" })
class Grn extends Model<GrnDTO> {
  @Column
  po_id: number;

  @Column
  percent_order_completed: number;

  @Column
  product_id: number;

  @Column
  product_name: string;

  @Column
  required_quantity: number;

  @Column
  received_quantity: number;

  @Column
  maximum_retail_price: number;

  @Column
  trade_price: number;

  @Column
  discount_percentage: number;

  @Column
  batch_number: string;

  @Column
  batch_expiry: Date;

  @Column
  comments: string;

  @Column
  remaining_quantity: number;

  @Column
  is_updatable: boolean;

  @Column
  grn_status: string;

  @Column
  foc: boolean;

  @Column
  qc_approved: boolean;

  @Column
  uom: string;

  @Column
  po_status: string;

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
}

export default Grn;
