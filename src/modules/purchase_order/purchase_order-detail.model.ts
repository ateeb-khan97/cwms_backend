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
  BelongsTo,
  DataType,
} from "sequelize-typescript";
//
import PurchaseOrderDetailDTO from "./dto/purchase_order-detail.dto";
import PurchaseOrder from "./purchase_order.model";
//
@Table({ tableName: "purchase_order_detail", initialAutoIncrement: "1000" })
class PurchaseOrderDetail extends Model<PurchaseOrderDetailDTO> {
  @Column
  product_id: number;

  @Column
  product_name: string;

  @Column
  manufacturer_id: number;

  @Column
  manufacturer_name: string;

  @Column
  required_quantity: number;

  @Column({ type: DataType.FLOAT })
  trade_price: number;

  @Column({ type: DataType.FLOAT })
  trade_discount_percentage: number;

  @Column({ type: DataType.FLOAT })
  sales_tax_percentage: number;

  @Column({ type: DataType.FLOAT })
  gst_percentage: number;

  @Column
  uom: string;

  @Column
  foc: boolean;

  @Column
  item_conversion: string;

  @ForeignKey(() => PurchaseOrder)
  po_id: number;

  @BelongsTo(() => PurchaseOrder)
  purchase_order: PurchaseOrder;
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

export default PurchaseOrderDetail;
