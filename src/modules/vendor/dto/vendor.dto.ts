import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
  IsObject,
} from "class-validator";
//
export default class VendorDTO {
  @IsString()
  vendor_name: string;

  @IsString()
  procurement_category?: string;

  @IsString()
  vendor_classification?: string;

  @IsString()
  ntn?: string;

  @IsString()
  cnic?: string;

  @IsString()
  cnic_expiry_date?: string;

  @IsString()
  strn?: string;

  @IsString()
  drug_license_no?: string;

  @IsString()
  tax_status?: string;

  @IsString()
  drug_sales_license?: string;

  @IsString()
  tax_exemption?: string;

  @IsString()
  contact_person?: string;

  @IsString()
  poc_phone_number?: string;

  @IsString()
  poc_email?: string;

  @IsString()
  business_address?: string;

  @IsString()
  city?: string;

  @IsString()
  business_phone_number?: string;

  @IsString()
  email_address?: string;

  @IsString()
  payment_terms?: string;

  @IsString()
  payment_method?: string;

  @IsString()
  vendor_credit_limit?: string;

  @IsString()
  delivery_lead_time?: string;

  @IsString()
  bank_name?: string;

  @IsString()
  bank_branch_code?: string;

  @IsString()
  branch_city?: string;

  @IsString()
  account_ibn_number?: string;

  @IsString()
  vendor_wise_discount?: string;

  @IsString()
  stock_return_policy?: string;

  @IsString()
  advance_income_tax?: string;

  @IsString()
  gst?: string;

  @IsString()
  minimum_order_quantity?: string;

  @IsString()
  with_hold_tax_group?: string;

  @IsString()
  sales_tax_group?: string;

  @IsString()
  with_hold_tax_percentage?: string;

  @IsString()
  sales_tax_percentage?: string;

  @IsString()
  line_of_business?: string;

  @IsString()
  tax_exemption_validity?: string;

  @IsString()
  comment?: string;

  @IsString()
  file_attachment_path?: string;

  @IsObject()
  file_attach?: File;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  id?: number;
}
