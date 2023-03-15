import { IsString, IsNumber, IsBoolean, IsDate } from "class-validator";
//
export default class InventorySkuDetailDto {
  @IsString()
  inward_id: string;

  @IsString()
  inward_child: string;

  @IsString()
  product_id: string;

  @IsString()
  second_level: string;

  @IsString()
  third_level: string;

  @IsString()
  bin_id: string;

  @IsDate()
  sku_date: Date;

  @IsString()
  user_name: string;

  @IsString()
  restack_date: string;

  @IsString()
  pick_list_id: string;

  @IsBoolean()
  qc_status: boolean;

  @IsDate()
  qc_date: Date;
  //
  @IsString()
  location_id: string;

  @IsString()
  account_number: string;

  @IsNumber()
  id: number;

  @IsBoolean()
  status: boolean;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;
}
