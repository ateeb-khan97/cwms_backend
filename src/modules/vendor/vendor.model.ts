import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  HasOne,
  BelongsToMany,
} from "sequelize-typescript";
import Manufacturer from "../manufacturer/manufacturer.model";
import ProductVendor from "../product/product-vendor.model";
import Product from "../product/product.model";
import VendorDTO from "./dto/vendor.dto";
import VendorManufacturer from "./vendor-manufacturer.model";
//
@Table({ tableName: "vendors", initialAutoIncrement: "1000" })
class Vendor extends Model<VendorDTO> {
  @Column
  vendor_name: string;

  @Column
  procurement_category: string;

  @Column
  vendor_classification: string;

  @Column
  ntn: string;

  @Column
  cnic: string;

  @Column
  cnic_expiry_date: Date;

  @Column
  strn: string;

  @Column
  drug_license_no: string;

  @Column
  tax_status: string;

  @Column
  drug_sales_license: string;

  @Column
  tax_exemption: string;

  @Column
  contact_person: string;

  @Column
  poc_phone_number: string;

  @Column
  poc_email: string;

  @Column
  business_address: string;

  @Column
  city: string;

  @Column
  business_phone_number: string;

  @Column
  email_address: string;

  @Column
  payment_terms: string;

  @Column
  payment_method: string;

  @Column
  vendor_credit_limit: string;

  @Column
  delivery_lead_time: string;

  @Column
  bank_name: string;

  @Column
  bank_branch_code: string;

  @Column
  branch_city: string;

  @Column
  account_ibn_number: string;

  @Column
  vendor_wise_discount: string;

  @Column
  stock_return_policy: string;

  @Column
  advance_income_tax: string;

  @Column
  gst: string;

  @Column
  minimum_order_quantity: string;

  @Column
  with_hold_tax_group: string;

  @Column
  with_hold_tax_percentage: string;

  @Column
  sales_tax_group: string;

  @Column
  sales_tax_percentage: string;

  @Column
  line_of_business: string;

  @Column
  tax_exemption_validity: Date;

  @Column
  comment: string;

  @Column
  file_attachment_path: string;

  @BelongsToMany(() => Product, () => ProductVendor)
  products: Product[];

  @BelongsToMany(() => Manufacturer, () => VendorManufacturer)
  manufacturers: Manufacturer[];
  //
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Column({ allowNull: false, defaultValue: false })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}

export default Vendor;
