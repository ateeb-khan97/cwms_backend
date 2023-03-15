import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { OrderType } from "./dto/purchase_order-detail.dto";
//
import PurchaseOrderDTO from "./dto/purchase_order.dto";
import PurchaseOrderDetail from "./purchase_order-detail.model";
//
@Table({ tableName: "purchase_order_master", initialAutoIncrement: "1000" })
class PurchaseOrder extends Model<PurchaseOrderDTO> {
  @Column
  vendor_id: number;

  @Column
  vendor_name: string;

  @Column
  address: string;

  @Column
  city: string;

  @Column
  ntn: string;

  @Column
  advance_income: string;

  @Column
  strn: string;

  @Column
  payment_terms: string;

  @Column
  expected_delivery_date: Date;

  @Column
  delivery_location: string;

  @Column
  po_type: string;

  @Column({ allowNull: true, defaultValue: null })
  arrival_date: Date;

  @Column
  order_status: string;

  @Column({
    type: DataType.ENUM("Normal", "Advance"),
    defaultValue: "Normal",
  })
  order_type: OrderType;

  @Column({ type: DataType.FLOAT })
  total_amount: number;

  @Column({ type: DataType.FLOAT })
  total_discount: number;

  @Column({ type: DataType.FLOAT })
  sales_tax: number;

  @Column({ type: DataType.FLOAT })
  net_amount: number;

  @Column
  comment: string;

  @Column({ defaultValue: false })
  is_cancelled: boolean;

  @HasMany(() => PurchaseOrderDetail)
  purchase_order_detail: PurchaseOrderDetail;
  //
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

export default PurchaseOrder;
