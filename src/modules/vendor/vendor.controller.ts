import { Request, Response } from "express";
import Vendor from "./vendor.model";
import VendorDTO from "./dto/vendor.dto";
import { ResponseHelper } from "../../helper/response.common";
import Manufacturer from "../manufacturer/manufacturer.model";
import Product from "../product/product.model";
import VendorManufacturer from "./vendor-manufacturer.model";
import VendorTax from "./vendor-tax.model";
//
export const create = async (req: any, res: Response) => {
  const vendor_data: VendorDTO = req.body;
  const { manufacturer }: any = req.body;
  try {
    // console.log(req.file);

    const vendor = await Vendor.create(vendor_data);
    await vendorManufacturerCreateFunction(manufacturer, vendor.id);
    return ResponseHelper.get(res, 200, "Success", [vendor_data]);
  } catch (err: any) {
    console.error(err);
    console.log(err.stack);

    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const findAll = async (req: Request, res: Response) => {
  try {
    const vendor = await Vendor.findAll({
      include: [Manufacturer, Product],
    });
    return ResponseHelper.get(res, 200, "Success", vendor);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const find = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const vendor = await Vendor.findOne({
      where: { id },
      include: [Manufacturer, Product],
    });
    return ResponseHelper.get(res, 200, "Success", [vendor]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const update = async (req: Request, res: Response) => {
  const vendor_data: VendorDTO = req.body;
  const { manufacturer }: any = req.body;
  try {
    await Vendor.update(vendor_data, {
      where: {
        id: vendor_data.id,
      },
    });
    await VendorManufacturer.destroy({
      where: {
        vendor_id: vendor_data.id,
      },
    });
    await vendorManufacturerCreateFunction(manufacturer, vendor_data.id!);
    return ResponseHelper.get(res, 200, "Success", [vendor_data]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findVendorTax = async (req: Request, res: Response) => {
  try {
    const vendor_tax = await VendorTax.findAll();
    return ResponseHelper.get(res, 200, "Success", vendor_tax);
  } catch (err: any) {
    console.log(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findForDataTable = async (req: Request, res: Response) => {
  try {
    const vendor = await Vendor.findAll({
      attributes: [
        "id",
        "vendor_name",
        "procurement_category",
        "drug_license_no",
        "contact_person",
        "business_phone_number",
        "email_address",
        "payment_method",
        "status",
      ],
    });
    return ResponseHelper.get(res, 200, "Success", vendor);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findForPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const vendor = await Vendor.findAll({
      attributes: ["id", "vendor_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name"],
          through: { attributes: [] },
        },
      ],
    });
    return ResponseHelper.get(res, 200, "Success", vendor);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const findForPurchaseOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const vendor = await Vendor.findAll({
      where: { id },
      attributes: ["id", "vendor_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name"],
          through: { attributes: [] },
        },
      ],
    });
    return ResponseHelper.get(res, 200, "Success", vendor);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const vendorForCreation = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const vendor = await Vendor.findAll({
      where: {
        id,
      },
      attributes: [
        "id",
        "vendor_name",
        "business_address",
        "city",
        "ntn",
        "strn",
        "payment_terms",
        "vendor_classification",
      ],
    });
    return ResponseHelper.get(res, 200, "Success", vendor);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
const vendorManufacturerCreateFunction = async (
  manufacturer: any[],
  vendor_id: number
) => {
  const vendor_manufacturer_temp = manufacturer.map(
    (each_manufacturer: number) => {
      console.log(each_manufacturer);

      return {
        manufacturer_id: each_manufacturer,
        vendor_id: vendor_id,
      };
    }
  );
  await VendorManufacturer.bulkCreate(vendor_manufacturer_temp);
};
