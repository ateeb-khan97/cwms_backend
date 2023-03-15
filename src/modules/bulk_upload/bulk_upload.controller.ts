import { ResponseHelper } from "../../helper/response.common";
import { Response } from "express";
import MyRequest from "../../types/Request";
import base64ToCsv from "../../functions/base64ToCsv";
import Manufacturer from "../manufacturer/manufacturer.model";
import Category from "../category/category.model";
import Vendor from "../vendor/vendor.model";
import VendorManufacturer from "../vendor/vendor-manufacturer.model";
import ProductDTO from "../product/dto/product.dto";
import Product from "../product/product.model";
import ProductCategory from "../product/product-category.model";
import ProductVendor from "../product/product-vendor.model";
import ProductConversion from "../product/product-conversion.model";
import ProductTag from "../product/product-tag.model";
import ProductGenericFormula from "../product/product-generic_formula.model";
//
export default class BulkUpload {
  static csvChecker(csv: string | null) {
    if (!csv) {
      throw new Error("Missing base64-encoded CSV data in request body");
    }
  }
  //
  static async product_upload(req: MyRequest, res: Response) {
    try {
      const { csv } = req.body;
      BulkUpload.csvChecker(csv);
      //
      const arrayData = base64ToCsv(csv, "product");
      //
      const productData: any = {
        bar_code: "",
        comment: "",
        discount_type: "",
        discounted_price: "",
        dosage_instruction: "",
        drap_id: "",
        item_nature: "",
        item_release_level: "",
        item_storage_location: "",
        item_tracking_level: "",
        manufacturer_id: 0,
        margin: "",
        maximum_retail_price: "",
        mrp_unit_price: 0,
        prescription_required: "",
        price_levels: "",
        product_lifecycle: "",
        product_name: "",
        purchasing_price: 0,
        purchasing_unit: "",
        quantity: "",
        sales_tax_group: "",
        sales_tax_percentage: "",
        selling_discount: "",
        side_effects: "",
        sku_department: "",
        sku_description: "",
        sku_maximum_level: "",
        sku_minimum_level: "",
        sku_reorder_level: "",
        sku_warehouse_lead_time: "",
        status: "",
        stock_nature: "",
        tax_code: "",
        trade_discount: 0,
        trade_price: "",
        product_conversions: "",
        manufacturer_name: "",
        category_names: [],
        vendor_names: [],
        selling_unit_02: "",
        item_conversion_02: "",
        selling_unit_03: "",
        item_conversion_03: "",
        tags: [],
        generic_formulas: [],
        product_id: 0,
      };
      //
      //
      var j = 0;
      for (let i = 0; i < (arrayData.length - 2) / 31; i++) {
        productData.product_name = arrayData[j++];
        productData.status = arrayData[j++];
        productData.comment = arrayData[j++];
        productData.sku_department = arrayData[j++];
        productData.item_nature = arrayData[j++];
        productData.discounted_price = arrayData[j++];
        productData.discount_type = arrayData[j++];
        productData.sku_minimum_level = arrayData[j++];
        productData.sku_maximum_level = arrayData[j++];
        productData.sales_tax_group = arrayData[j++];
        productData.sales_tax_percentage = arrayData[j++];
        productData.sku_reorder_level = arrayData[j++];
        productData.sku_warehouse_lead_time = arrayData[j++];
        productData.item_release_level = arrayData[j++];
        productData.price_levels = arrayData[j++];
        productData.stock_nature = arrayData[j++];
        productData.bar_code = arrayData[j++];
        productData.drap_id = arrayData[j++];
        productData.dosage_instruction = arrayData[j++];
        productData.side_effects = arrayData[j++];
        productData.prescription_required = arrayData[j++];
        productData.sku_description = arrayData[j++];
        productData.manufacturer_name = arrayData[j++];
        productData.category_names = arrayData[j++]
          ?.split(",")
          .map((each_data) => each_data.trim());
        productData.vendor_names = arrayData[j++]
          ?.split(",")
          .map((each_data) => each_data.trim());
        productData.selling_unit_02 = arrayData[j++];
        productData.item_conversion_02 = arrayData[j++];
        productData.selling_unit_03 = arrayData[j++];
        productData.item_conversion_03 = arrayData[j++];
        productData.tags = arrayData[j++]
          ?.split(",")
          .map((each_data) => each_data.trim());
        productData.generic_formulas = arrayData[j++]
          ?.split(",")
          .map((each_data) => each_data.trim());
        //
        // manufacturer
        const manufacturerExists = await Manufacturer.findOne({
          raw: true,
          where: { manufacturer_name: productData.manufacturer_name },
        });

        if (manufacturerExists == null) {
          const newManufacturer = await Manufacturer.create(
            {
              manufacturer_name: productData.manufacturer_name,
              status: "false",
              comment: "",
              line_of_business: "",
            },
            { raw: true }
          );
          productData.manufacturer_id = newManufacturer.id;
        } else {
          productData.manufacturer_id = manufacturerExists.id;
        }
        //
        // product
        const productExists = await Product.findOne({
          raw: true,
          where: { product_name: productData.product_name },
        });
        //
        if (productExists == null) {
          const newProduct = await Product.create(
            { ...productData },
            { raw: true }
          );
          productData.product_id = newProduct.id;
        } else {
          await Product.update(
            { ...productData },
            { where: { id: productExists.id } }
          );
          productData.product_id = productExists.id;
        }
        //
        // category
        await ProductCategory.destroy({
          where: { product_id: productData.product_id },
        });
        for (const each_category of productData.category_names) {
          const categoryExists = await Category.findOne({
            where: {
              category_name: each_category,
              category_level: "Sub Level",
            },
          });
          var category_id = categoryExists?.id;
          //
          if (categoryExists == null) {
            const newCategory = await Category.create(
              {
                category_name: each_category,
                category_level: "Sub Level",
                status: "false",
              },
              { raw: true }
            );
            category_id = newCategory.id;
          }
          //

          await ProductCategory.create({
            product_id: productData.product_id,
            category_id: category_id,
          });
          //
        }
        //
        // vendor
        await ProductVendor.destroy({
          where: { product_id: productData.product_id },
        });
        for (const each_vendor of productData.vendor_names) {
          var vendor_id = 0;
          const vendorExists = await Vendor.findOne({
            where: { vendor_name: each_vendor },
          });
          //
          if (vendorExists == null) {
            const newVendor = await Vendor.create({
              vendor_name: each_vendor,
              status: false,
            });
            vendor_id = newVendor.id;
          } else {
            vendor_id = vendorExists.id;
          }
          //
          await ProductVendor.create({
            product_id: productData.product_id,
            vendor_id: vendor_id,
          });
        }
        // product_conversion
        await ProductConversion.destroy({
          where: { product_id: productData.product_id },
        });
        //
        await ProductConversion.create({
          type: "C",
          selling_unit: "Carton",
          item_conversion: "1",
          sorting: "1",
          product_id: productData.product_id,
        });
        await ProductConversion.create({
          type: "B",
          selling_unit: productData.selling_unit_02,
          item_conversion: productData.item_conversion_02,
          sorting: "2",
          product_id: productData.product_id,
        });
        await ProductConversion.create({
          type: "P",
          selling_unit: productData.selling_unit_03,
          item_conversion: productData.item_conversion_03,
          sorting: "3",
          product_id: productData.product_id,
        });
        //
        // tags
        await ProductTag.destroy({
          where: { product_id: productData.product_id },
        });
        for (const tags of productData.tags) {
          await ProductTag.create({
            tag: tags,
            product_id: productData.product_id,
          });
        }
        // formulas
        await ProductGenericFormula.destroy({
          where: { product_id: productData.product_id },
        });
        for (const formulas of productData.generic_formulas) {
          await ProductGenericFormula.create({
            product_generic_formula: formulas,
            product_id: productData.product_id,
          });
        }
        //
      }
      //
      //

      //
      return ResponseHelper.get(res, 200, "Success", []);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
  static async category_upload(req: MyRequest, res: Response) {
    try {
      const { csv } = req.body;
      BulkUpload.csvChecker(csv);
      //
      const arrayData = base64ToCsv(csv, "category");
      //
      var category_data: any = {
        category_level: "",
        category_name: "",
        category_description: "",
        sorting: 0,
        category_image_url: "",
        comment: "",
        parent_id: 0,
        parent_name: "",
        status: "1",
      };
      //
      var j = 0;
      for (let i = 0; i < (arrayData.length - 2) / 8; i++) {
        category_data.category_name = arrayData[j++];
        category_data.status = arrayData[j++];
        category_data.comment = arrayData[j++];
        category_data.category_level = arrayData[j++];
        category_data.category_description = arrayData[j++];
        category_data.sorting = +arrayData[j++];
        category_data.category_image_url = arrayData[j++];
        category_data.parent_name = arrayData[j++];
        //
        if (category_data.category_level == "Sub Level") {
          const sub_level = await Category.findOne({
            raw: true,
            where: {
              category_name: category_data.parent_name,
              category_level: "Parent Level",
            },
          });
          //
          if (sub_level == null) {
            await Category.create({
              category_name: category_data.parent_name,
              category_level: "Parent Level",
              category_description: "",
              sorting: 0,
              category_image_url: "",
              comment: "",
              status: "true",
            });
          }
          //
        }
      }
      //
      var j = 0;
      for (let i = 0; i < (arrayData.length - 2) / 8; i++) {
        //
        category_data.category_name = arrayData[j++];
        category_data.status = arrayData[j++];
        category_data.comment = arrayData[j++];
        category_data.category_level = arrayData[j++];
        category_data.category_description = arrayData[j++];
        category_data.sorting = +arrayData[j++];
        category_data.category_image_url = arrayData[j++];
        category_data.parent_name = arrayData[j++];
        //
        if (category_data.category_level == "Sub Level") {
          const parent_name = category_data.parent_name;
          //
          const parent_category = await Category.findOne({
            raw: true,
            where: {
              category_name: parent_name,
              category_level: "Parent Level",
            },
          });
          //
          //
          const doesExists = await Category.findOne({
            raw: true,
            where: {
              category_name: category_data.category_name,
              category_level: "Sub Level",
            },
          });

          //
          if (doesExists) {
            await Category.update(
              {
                ...category_data,
                parent_id: parent_category?.id.toString(),
              },
              {
                where: {
                  id: doesExists.id,
                  category_level: "Sub Level",
                },
              }
            );
          } else {
            await Category.create({
              ...category_data,
              parent_id: parent_category?.id.toString(),
            });
          }

          //
        } else {
          const parent_category = await Category.findOne({
            where: {
              category_name: category_data.category_name,
              category_level: "Parent Level",
            },
          });
          //
          if (parent_category) {
            await Category.update(
              {
                ...category_data,
              },
              {
                where: {
                  id: parent_category.id,
                },
              }
            );
          } else {
            await Category.create({ ...category_data });
          }
          //
        }
        //
      }
      //
      return ResponseHelper.get(res, 200, "Success", []);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
  static async vendor_upload(req: MyRequest, res: Response) {
    try {
      const { csv } = req.body;
      BulkUpload.csvChecker(csv);
      //
      const arrayData = base64ToCsv(csv, "vendor");
      //
      var vendorData: any = {
        account_ibn_number: "",
        advance_income_tax: "",
        bank_branch_code: "",
        bank_name: "",
        branch_city: "",
        business_address: "",
        business_phone_number: "",
        city: "",
        cnic: "",
        cnic_expiry_date: "",
        comment: "",
        contact_person: "",
        delivery_lead_time: "",
        drug_license_no: "",
        drug_sales_license: "",
        email_address: "",
        gst: "",
        line_of_business: "",
        minimum_order_quantity: "",
        ntn: "",
        payment_method: "",
        payment_terms: "",
        poc_email: "",
        poc_phone_number: "",
        procurement_category: "",
        sales_tax_group: "",
        sales_tax_percentage: "",
        status: true,
        stock_return_policy: "",
        strn: "",
        tax_exemption: "",
        tax_exemption_validity: "",
        tax_status: "",
        vendor_classification: "",
        vendor_credit_limit: "",
        vendor_name: "",
        vendor_wise_discount: "",
        with_hold_tax_group: "",
        with_hold_tax_percentage: "",
        manufacturer_name: [],
        vendor_id: 0,
        manufacturer_id: 0,
      };
      //

      var j = 0;
      for (let i = 0; i < (arrayData.length - 2) / 33; i++) {
        vendorData.vendor_name = arrayData[j++];
        vendorData.status = JSON.parse(arrayData[j++]);
        vendorData.comment = arrayData[j++];
        vendorData.procurement_category = "[" + arrayData[j++] + "]";
        vendorData.vendor_classification = arrayData[j++];
        vendorData.ntn = arrayData[j++];
        vendorData.cnic = arrayData[j++];
        vendorData.cnic_expiry_date =
          arrayData[j++] == "" ? null : arrayData[j++] == "";
        vendorData.tax_status = arrayData[j++];
        vendorData.drug_sales_license = arrayData[j++];
        vendorData.tax_exemption = arrayData[j++];
        vendorData.tax_exemption_validity =
          arrayData[j++] == "" ? null : arrayData[j++];
        vendorData.with_hold_tax_group = arrayData[j++];
        vendorData.with_hold_tax_percentage = arrayData[j++];
        vendorData.strn = arrayData[j++];
        vendorData.drug_license_no = arrayData[j++];
        vendorData.contact_person = arrayData[j++];
        vendorData.poc_phone_number = arrayData[j++];
        vendorData.poc_email = arrayData[j++];
        vendorData.business_address = arrayData[j++];
        vendorData.city = arrayData[j++];
        vendorData.business_phone_number = arrayData[j++];
        vendorData.email_address = arrayData[j++];
        vendorData.payment_method = arrayData[j++];
        vendorData.payment_terms = arrayData[j++];
        vendorData.vendor_credit_limit = arrayData[j++];
        vendorData.delivery_lead_time = arrayData[j++];
        vendorData.bank_name = arrayData[j++];
        vendorData.bank_branch_code = arrayData[j++];
        vendorData.branch_city = arrayData[j++];
        vendorData.account_ibn_number = arrayData[j++];
        vendorData.stock_return_policy = arrayData[j++];
        vendorData.manufacturer_name = arrayData[j++]
          .split(",")
          .map((each_elem: string) => each_elem.trim());
        //

        const vendorExists = await Vendor.findOne({
          raw: true,
          where: { vendor_name: vendorData.vendor_name },
        });
        vendorExists;

        if (vendorExists) {
          vendorData.vendor_id = vendorExists!.id;
          await Vendor.update(
            {
              ...vendorData,
            },
            {
              where: {
                id: vendorData.vendor_id,
              },
            }
          );
        } else {
          const vendor = await Vendor.create({ ...vendorData }, { raw: true });
          vendorData.vendor_id = vendor.id;
        }
        //
        await VendorManufacturer.destroy({
          where: {
            vendor_id: vendorData.vendor_id,
          },
        });
        //
        vendorData.manufacturer_name.forEach(async (each_manu: string) => {
          const manufacturerExists = await Manufacturer.findOne({
            raw: true,
            where: {
              manufacturer_name: each_manu,
            },
          });
          vendorData.manufacturer_id = manufacturerExists?.id;
          //
          if (manufacturerExists == null) {
            const manufacturer = await Manufacturer.create(
              {
                manufacturer_name: each_manu,
                comment: "",
                line_of_business: "",
                status: "true",
              },
              { raw: true }
            );
            vendorData.manufacturer_id = manufacturer.id;
          }
          //

          await VendorManufacturer.create({
            vendor_id: vendorData.vendor_id,
            manufacturer_id: vendorData.manufacturer_id,
          });
          //
        });
        //
      }

      //
      return ResponseHelper.get(res, 200, "Success", []);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
  static async manufacturer_upload(req: MyRequest, res: Response) {
    try {
      const { csv } = req.body;
      BulkUpload.csvChecker(csv);
      //
      const arrayData = base64ToCsv(csv, "manufacturer");
      //
      var manufacturer_data = {
        manufacturer_name: "",
        status: "",
        comment: "",
        line_of_business: "",
      };
      //
      var j = 0;
      for (let i = 0; i < arrayData.length / 4 - 1; i++) {
        manufacturer_data.manufacturer_name = arrayData[j++];
        manufacturer_data.status = arrayData[j++];
        manufacturer_data.comment = arrayData[j++];
        manufacturer_data.line_of_business = `["${arrayData[j++]}"]`;
        //
        const manufacturer_response = await Manufacturer.findOne({
          raw: true,
          where: { manufacturer_name: manufacturer_data.manufacturer_name },
        });
        //
        if (manufacturer_response != null) {
          await Manufacturer.update(
            { ...manufacturer_data },
            {
              where: { manufacturer_name: manufacturer_data.manufacturer_name },
            }
          );
        } else {
          await Manufacturer.create({ ...manufacturer_data });
        }
      }
      //

      //
      return ResponseHelper.get(res, 200, "Success", []);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
}
