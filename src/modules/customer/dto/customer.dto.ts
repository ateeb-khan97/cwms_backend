import { IsString, IsNumber, IsBoolean } from "class-validator";
//
export default class CustomerDTO {
  @IsString()
  customer_name: string;

  @IsString()
  account_number: string;

  @IsString()
  city: string;

  @IsNumber()
  owner_name: number;

  @IsBoolean()
  status: string;

  @IsNumber()
  id: number;
}
