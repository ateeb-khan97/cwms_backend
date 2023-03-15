import { Response, Request } from "express";
import { ResponseHelper } from "../../helper/response.common";
import Grn from "./grn.model";
import GrnDTO from "./dto/grn.dto";
import sequelize from "../../db_config";
import { findProductById } from "../product/product.controller";
import Product from "../product/product.model";
import arrayModifier from "../../functions/array_modifier";
import PurchaseOrder from "../purchase_order/purchase_order.model";
import ProductDTO from "../product/dto/product.dto";
import { GrnType } from "./dto/grn.type";
import InvSkuModule from "../inv_sku/inv_sku.module";
import MyRequest from "../../types/Request";
//
export const create = async (req: Request, res: Response) => {
  try {
    const old_id: number[] = [];
    const { grn_data }: { grn_data: GrnDTO[] } = req.body;

    const {
      po_id,
      percent_order_completed,
    }: { po_id: number; percent_order_completed: number } = req.body;
    //
    const data_to_store = grn_data.map((each_grn: GrnDTO) => {
      old_id.push(each_grn.id);
      //@ts-ignore
      delete each_grn.id;
      return {
        ...each_grn,
        po_id,
        po_status: "Approved",
        percent_order_completed,
        remaining_quantity:
          each_grn.required_quantity - each_grn.received_quantity,
        is_updatable:
          each_grn.required_quantity - each_grn.received_quantity === 0
            ? false
            : true,
        grn_status:
          each_grn.required_quantity - each_grn.received_quantity === 0
            ? "R"
            : "PR",
      };
    });
    //
    const modified_array = arrayModifier(old_id);

    await sequelize.query(
      `UPDATE grn set is_updatable = 0 where id in ${modified_array}`
    );

    await Grn.bulkCreate(data_to_store);
    //
    //
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    console.log(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const response = await Grn.findAll();
    return ResponseHelper.get(res, 200, "Success", response);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const find = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const response = await Grn.findOne({
      where: { id },
    });
    return ResponseHelper.get(res, 200, "Success", [response]);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const quality_approve = async (req: MyRequest, res: Response) => {
  try {
    const {
      id,
      po_id,
      product_id,
      foc,
      uom,
      maximum_retail_price,
      trade_price,
      discount_percentage,
    }: GrnType = req.body;

    if (!foc) {
      const product: ProductDTO | null = await findProductById(product_id);
      if (product != undefined) {
        var { selling_unit, item_conversion } =
          product.product_conversions![product.product_conversions!.length - 1];
        //
      }
      //
      var mrp_unit_price =
        selling_unit == uom
          ? maximum_retail_price
          : +(+maximum_retail_price / +item_conversion).toFixed(3);
      var purchasing_price: number =
        +trade_price - +discount_percentage + +trade_price;

      const data_to_update = {
        mrp_unit_price: +mrp_unit_price,
        maximum_retail_price: maximum_retail_price,
        trade_price: trade_price,
        trade_discount: discount_percentage,
        margin: (+mrp_unit_price - purchasing_price).toString(),
        purchasing_price: purchasing_price,
      };

      await Product.update(data_to_update, { where: { id: product_id } });
    }

    await Grn.update(
      {
        qc_approved: true,
      },
      {
        where: { id },
      }
    );
    //
    const [[count]]: any = await sequelize.query(
      `SELECT count(*) as cnt from grn where po_id = '${po_id}' and is_updatable=1`
    );
    if (count.cnt == 0) {
      await PurchaseOrder.update(
        { order_status: "Received" },
        { where: { id: po_id } }
      );
      await Grn.update({ po_status: "Received" }, { where: { po_id } });
    } else {
      await PurchaseOrder.update(
        { order_status: "Par-Received" },
        { where: { id: po_id } }
      );
      await Grn.update({ po_status: "Par-Received" }, { where: { po_id } });
    }
    //
    console.log(req.user_information);

    await InvSkuModule.create(
      req.body,
      req.user_information!.acc_no,
      req.user_information!.loc_no
    );
    //
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const quality_reject = async (req: Request, res: Response) => {
  try {
    const { id, received_quantity, product_id, po_id, required_quantity, foc } =
      req.body;
    const [[count]]: any = await sequelize.query(
      `SELECT count(*) as cnt from grn where product_id=${product_id} and po_id = ${po_id} AND foc = ${foc}`
    );
    //
    const response = await Grn.update(
      {
        is_updatable: true,
        received_quantity: 0,
        required_quantity:
          count.cnt == 1 ? required_quantity : received_quantity,
        remaining_quantity:
          count.cnt == 1 ? required_quantity : received_quantity,
        grn_status: "D",
      },
      {
        where: { id },
      }
    );
    //
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
