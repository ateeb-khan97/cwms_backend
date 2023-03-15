import { IsString, IsNumber, IsBoolean, isString } from "class-validator";
//
type UserType = "admin" | "user";
export default class UserDTO {
  @IsString()
  user_id: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  account_number: string;

  @IsString()
  user_name: UserType;

  @IsString()
  phone_number: string;

  @IsString()
  type: string;

  @IsString()
  loc_code: string;

  @IsBoolean()
  status: string;

  @IsNumber()
  id: number;
}
