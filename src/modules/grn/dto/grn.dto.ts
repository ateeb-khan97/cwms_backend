import { IsString, IsNumber, IsBoolean, IsDate } from "class-validator";
//
export default class GrnDTO {
  @IsNumber()
  po_id: number;

  @IsNumber()
  percent_order_completed: number;

  @IsNumber()
  product_id: number;

  @IsString()
  product_name: string;

  @IsNumber()
  required_quantity: number;

  @IsNumber()
  received_quantity: number;

  @IsNumber()
  maximum_retail_price: number;

  @IsNumber()
  trade_price: number;

  @IsNumber()
  discount_percentage: number;

  @IsString()
  batch_number: string;

  @IsDate()
  batch_expiry: Date;

  @IsString()
  comments: string;

  @IsNumber()
  remaining_quantity: number;

  @IsString()
  is_updatable: boolean;

  @IsString()
  grn_status: string;

  @IsBoolean()
  foc: boolean;

  @IsBoolean()
  qc_approved: boolean;

  @IsString()
  uom: string;

  @IsString()
  po_status: string;

  @IsString()
  location_id: string;

  @IsString()
  account_number: string;

  @IsBoolean()
  status: string;

  @IsNumber()
  id: number;
}
