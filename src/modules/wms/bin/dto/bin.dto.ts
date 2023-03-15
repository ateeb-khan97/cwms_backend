import { IsString, IsNumber, IsDate } from "class-validator";
//
export default class BinDTO {
  @IsString()
  bin_id: string;

  @IsString()
  rack_id: string;

  @IsNumber()
  sorting: number;

  @IsString()
  acc_no: string;

  @IsString()
  loc_no: string;

  @IsNumber()
  id: number;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
