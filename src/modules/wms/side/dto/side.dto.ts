import { IsString, IsNumber, IsDate } from "class-validator";
//
export default class SideDTO {
  @IsString()
  side_id: string;

  @IsString()
  path_id: string;

  @IsString()
  acc_no: string;

  @IsString()
  loc_no: string;

  @IsNumber()
  id?: number;

  @IsDate()
  created_at?: Date;

  @IsDate()
  updated_at?: Date;
}
