import { IsString, IsNumber, IsBoolean } from "class-validator";
//
export default class LocationDTO {
  @IsString()
  loc_code: string;

  @IsString()
  loc_name: string;

  @IsString()
  loc_address: string;

  @IsString()
  loc_country: string;

  @IsString()
  loc_city: string;

  @IsString()
  loc_contact_person: string;

  @IsString()
  loc_contact_phone_number: string;

  @IsString()
  loc_telephone_number: string;

  @IsString()
  loc_fax_number: string;

  @IsString()
  loc_email: string;

  @IsString()
  loc_type: string;

  @IsString()
  account_number: string;

  @IsBoolean()
  status: string;

  @IsNumber()
  id: number;
}
