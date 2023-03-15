import { IsString, IsNumber, IsBoolean, IsDate } from "class-validator";
//
export type SellingUnitType = "Carton" | "Box" | "Pieces" | "Strips";
//
export default class ProductConversionDTO {
  @IsString()
  type: string;

  @IsString()
  selling_unit: SellingUnitType;

  @IsString()
  item_conversion: string;

  @IsNumber()
  sorting: number;

  @IsNumber()
  id: number;
}
