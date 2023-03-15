import { IsString, IsNumber, IsBoolean } from "class-validator";
//
export default class ManufacturerDTO {
  @IsString()
  manufacturer_name: string;

  @IsString()
  line_of_business: string;

  @IsString()
  comment: string;

  @IsBoolean()
  status: string;

  @IsNumber()
  id?: number;
}
