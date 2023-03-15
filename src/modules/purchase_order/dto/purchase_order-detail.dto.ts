import { IsString, IsNumber, IsBoolean, IsDate } from "class-validator";
//
export type OrderType = "Normal" | "Advance";
//
export default class PurchaseOrderDetailDTO {
  @IsNumber()
  product_id: number;

  @IsString()
  product_name: string;

  @IsString()
  manufacturer_id: string;

  @IsString()
  manufacturer_name: string;

  @IsNumber()
  required_quantity: number;

  @IsNumber()
  trade_price: number;

  @IsNumber()
  trade_discount_percentage: number;

  @IsNumber()
  sales_tax_percentage: number;

  @IsNumber()
  gst_percentage: number;

  @IsString()
  uom: string;

  @IsString()
  item_conversion: string;

  @IsBoolean()
  foc: boolean;

  @IsNumber()
  id: number;
}
