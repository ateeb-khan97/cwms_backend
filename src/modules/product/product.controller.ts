import { Request, Response } from "express";
import Product from "./product.model";
import ProductDTO from "./dto/product.dto";
import { ResponseHelper } from "../../helper/response.common";
import ProductConversionDTO from "./dto/product-coversion.dto";
import ProductConversion from "./product-conversion.model";
import ProductTag from "./product-tag.model";
import ProductGenericFormula from "./product-generic_formula.model";
import ProductCategory from "./product-category.model";
import ProductVendor from "./product-vendor.model";
import Manufacturer from "../manufacturer/manufacturer.model";
import Vendor from "../vendor/vendor.model";
import Category from "../category/category.model";
import arrayModifier from "../../functions/array_modifier";
//
type ProductRelation = {
  manufacturer_id: number;
  product_conversion: any[];
  product_tag: any[];
  product_generic_formula: any[];
  category: any[];
  vendor: any[];
};
//
export const findForDataTable = async (req: Request, res: Response) => {
  try {
    const product = await Product.findAll({
      attributes: [
        "id",
        "product_name",
        "trade_price",
        "discounted_price",
        "maximum_retail_price",
        "stock_nature",
        "quantity",
        "status",
      ],
      include: [
        {
          model: Manufacturer,
          attributes: ["manufacturer_name"],
        },
      ],
    });
    return ResponseHelper.get(res, 200, "Success", product);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findProductById = async (id: number) => {
  const product = await Product.findOne({
    where: { id },
    include: [
      Manufacturer,
      Vendor,
      ProductConversion,
      ProductTag,
      ProductGenericFormula,
      Category,
    ],
  });
  return product;
};
//
export const create = async (req: Request, res: Response) => {
  const product_data: ProductDTO = req.body;
  const {
    manufacturer_id,
    product_conversion,
    product_tag,
    product_generic_formula,
    category,
    vendor,
  }: ProductRelation = req.body;
  //
  try {
    const product = await Product.create({
      ...product_data,
      manufacturer_id: manufacturer_id,
    });
    await productConversionCreateFunction(product_conversion, product.id);
    await productTagCreateFunction(product_tag, product.id);
    await productGenericFormulaCreateFunction(
      product_generic_formula,
      product.id
    );
    await productCategoryCreateFunction(category, product.id);
    await productVendorCreateFunction(vendor, product.id);

    return ResponseHelper.get(res, 200, "Success", [product]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const product = await Product.findAll({
      include: [
        Manufacturer,
        Vendor,
        ProductConversion,
        ProductTag,
        ProductGenericFormula,
        Category,
      ],
    });
    return ResponseHelper.get(res, 200, "Success", product);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const find = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const product = await findProductById(id);
    return ResponseHelper.get(res, 200, "Success", [product]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findInIds = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    const product = await Product.findAll({
      include: [
        {
          model: ProductConversion,
          attributes: ["selling_unit", "item_conversion", "sorting"],
        },
        { model: Manufacturer, attributes: ["manufacturer_name", "id"] },
      ],
      attributes: ["id", "product_name", "sales_tax_percentage", "quantity"],
      where: {
        id: ids,
      },
    });
    return ResponseHelper.get(res, 200, "Success", product);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findForSearchTable = async (req: Request, res: Response) => {
  try {
    const product = await Product.findAll({
      attributes: ["id", "product_name"],
      where: { status: true },
      include: [
        {
          model: Vendor,
          attributes: ["id", "vendor_name"],
          through: { attributes: [] },
        },
      ],
    });
    return ResponseHelper.get(res, 200, "Success", product);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const update = async (req: Request, res: Response) => {
  const product_data: ProductDTO = req.body;
  const {
    manufacturer_id,
    product_conversion,
    product_tag,
    product_generic_formula,
    category,
    vendor,
  }: ProductRelation = req.body;
  try {
    await Product.update(
      { ...product_data, manufacturer_id: manufacturer_id },
      {
        where: {
          id: product_data.id,
        },
      }
    );
    await ProductConversion.destroy({ where: { product_id: product_data.id } });
    await ProductTag.destroy({ where: { product_id: product_data.id } });
    await ProductGenericFormula.destroy({
      where: { product_id: product_data.id },
    });
    await ProductCategory.destroy({ where: { product_id: product_data.id } });
    await ProductVendor.destroy({ where: { product_id: product_data.id } });
    //
    await productConversionCreateFunction(product_conversion, product_data.id);
    await productTagCreateFunction(product_tag, product_data.id);
    await productGenericFormulaCreateFunction(
      product_generic_formula,
      product_data.id
    );
    await productCategoryCreateFunction(category, product_data.id);
    await productVendorCreateFunction(vendor, product_data.id);
    //
    return ResponseHelper.get(res, 200, "Success", [product_data]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
//
//
//
//
//
// Functions
const productConversionCreateFunction = async (
  productConversion: ProductConversionDTO[],
  product_id: number
) => {
  productConversion.forEach(
    async (each_conversion: ProductConversionDTO, key: number) => {
      let type_temp: any = {};
      switch (key) {
        case 0: {
          type_temp = {
            type: "C",
            sorting: 0,
          };
          break;
        }
        case 1: {
          type_temp = {
            type: "B",
            sorting: 1,
          };
          break;
        }
        case 2: {
          type_temp = {
            type: "P",
            sorting: 2,
          };
          break;
        }
        default: {
          break;
        }
      }
      await ProductConversion.create({
        type: type_temp.type,
        sorting: type_temp.sorting,
        selling_unit: each_conversion.selling_unit,
        item_conversion: each_conversion.item_conversion,
        product_id: product_id,
      });
    }
  );
};

const productTagCreateFunction = async (
  productTag: any[],
  product_id: number
) => {
  if (productTag.length > 0) {
    const product_tag_temp: any[] = [];
    productTag.forEach((each_tag: any) => {
      product_tag_temp.push({
        product_id: product_id,
        tag: each_tag,
      });
    });
    await ProductTag.bulkCreate(product_tag_temp);
  }
};

const productGenericFormulaCreateFunction = async (
  productGenericFormula: any[],
  product_id: number
) => {
  if (productGenericFormula.length > 0) {
    var generic_formula_temp: any[] = [];
    productGenericFormula.forEach((each_formula: any) => {
      generic_formula_temp.push({
        product_id: product_id,
        product_generic_formula: each_formula,
      });
    });
    await ProductGenericFormula.bulkCreate(generic_formula_temp);
  }
};

const productCategoryCreateFunction = async (
  category: any[],
  product_id: number
) => {
  if (category.length > 0) {
    const category_temp: any[] = category.map((each_category: any) => {
      return {
        category_id: each_category,
        product_id: product_id,
      };
    });
    await ProductCategory.bulkCreate(category_temp);
  }
};

const productVendorCreateFunction = async (
  vendor: any[],
  product_id: number
) => {
  if (vendor.length > 0) {
    const vendor_temp: any[] = vendor.map((each_vendor: any) => {
      return {
        vendor_id: each_vendor,
        product_id: product_id,
      };
    });
    await ProductVendor.bulkCreate(vendor_temp);
  }
};

//
