import { IsString, IsNumber, IsBoolean, IsDate } from "class-validator";
//
export type OrderType = "Normal" | "Advance";
//
export default class PurchaseOrderDTO {
  @IsNumber()
  vendor_id: number;

  @IsString()
  vendor_name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  ntn: string;

  @IsString()
  advance_income: string;

  @IsString()
  strn: string;

  @IsString()
  payment_terms: string;

  @IsDate()
  expected_delivery_date: Date;

  @IsString()
  delivery_location: string;

  @IsString()
  po_type: string;

  @IsDate()
  arrival_date: Date;

  @IsString()
  order_status: string;

  @IsString()
  order_type: OrderType;

  @IsNumber()
  total_amount: number;

  @IsNumber()
  total_discount: number;

  @IsNumber()
  sales_tax: number;

  @IsNumber()
  advance_income_tax: number;

  @IsNumber()
  net_amount: number;

  @IsString()
  comment: string;

  @IsBoolean()
  is_cancelled: boolean;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  id: number;
}
