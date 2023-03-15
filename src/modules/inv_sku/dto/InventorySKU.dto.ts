import { IsString, IsNumber, IsBoolean, IsDate } from "class-validator";
//
export default class InventorySkuDto {
  @IsString()
  inward_id?: string;

  @IsString()
  inward_date?: string;

  @IsNumber()
  po_id: number;

  @IsNumber()
  product_id: number;

  @IsString()
  product_name: string;

  @IsString()
  required_quantity: string;

  @IsString()
  received_quantity: string;

  @IsString()
  maximum_retail_price: string;

  @IsString()
  trade_price: string;

  @IsString()
  discount_percentage: string;

  @IsString()
  batch_number: string;

  @IsString()
  batch_expiry: string;

  @IsString()
  comments: string;

  @IsBoolean()
  foc: boolean;

  @IsString()
  uom: string;

  @IsString()
  location_id: string;

  @IsString()
  account_number: string;

  @IsNumber()
  id?: number;

  @IsBoolean()
  status: boolean;

  @IsString()
  created_at?: string;

  @IsString()
  updated_at?: string;
}
