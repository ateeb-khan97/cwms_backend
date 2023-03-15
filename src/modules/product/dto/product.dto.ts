import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
  IsArray,
} from "class-validator";
//
export type DiscountType = "price" | "percentage";
//
export default class ProductDTO {
  @IsString()
  product_name: string;

  @IsString()
  sku_description: string;

  @IsString()
  sku_department: string;

  @IsString()
  item_nature: string;

  @IsString()
  tax_code: string;

  @IsString()
  purchasing_unit: string;

  @IsString()
  trade_price: string;

  @IsString()
  discounted_price: string;

  @IsString()
  maximum_retail_price: string;

  @IsString()
  margin: string;

  @IsString()
  sku_minimum_level: string;

  @IsString()
  sku_maximum_level: string;

  @IsString()
  sku_reorder_level: string;

  @IsString()
  sku_warehouse_lead_time: string;

  @IsString()
  item_release_level: string;

  @IsString()
  price_levels: string;

  @IsString()
  stock_nature: string;

  @IsString()
  bar_code: string;

  @IsString()
  selling_discount: string;

  @IsString()
  item_storage_location: string;

  @IsString()
  item_tracking_level: string;

  @IsString()
  product_lifecycle: string;

  @IsString()
  quantity: string;

  @IsBoolean()
  prescription_required: boolean;

  @IsBoolean()
  drap_id: string;

  @IsString()
  side_effects: string;

  @IsString()
  sales_tax_group: string;

  @IsString()
  sales_tax_percentage: string;

  @IsString()
  dosage_instruction: string;

  @IsString()
  discount_type: DiscountType;

  @IsNumber()
  manufacturer_id: number;

  @IsNumber()
  purchasing_price: number;

  @IsNumber()
  mrp_unit_price: number;

  @IsString()
  trade_discount: number;

  @IsString()
  comment: string;

  @IsArray()
  product_conversions?: any[];

  @IsBoolean()
  status: boolean;

  @IsNumber()
  id: number;
}
