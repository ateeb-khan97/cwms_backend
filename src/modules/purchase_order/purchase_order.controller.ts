import PurchaseOrderDetailDTO from "./dto/purchase_order-detail.dto";
import PurchaseOrderDetail from "./purchase_order-detail.model";
import PurchaseOrderDTO from "./dto/purchase_order.dto";
import PurchaseOrder from "./purchase_order.model";
//
import { ResponseHelper } from "../../helper/response.common";
import { Request, Response } from "express";
import Grn from "../grn/grn.model";
import { Op } from "sequelize";
import sequelize from "../../db_config";
//
export const create = async (req: Request, res: Response) => {
  const purchase_order_data: PurchaseOrderDTO = req.body;
  const { orders }: { orders: any[] } = req.body;
  //
  try {
    const purchase_order = await PurchaseOrder.create(
      {
        ...purchase_order_data,
        order_status:
          purchase_order_data.net_amount <= 5000 ? "Approved" : "Pending",
      },
      { raw: true }
    );
    //
    const forBulkCreation: any[] = orders.map(
      (each_item: PurchaseOrderDetailDTO) => {
        return {
          po_id: purchase_order.id,
          product_id: each_item.product_id,
          product_name: each_item.product_name,
          manufacturer_id: each_item.manufacturer_id,
          manufacturer_name: each_item.manufacturer_name,
          required_quantity: each_item.required_quantity,
          trade_price: each_item.trade_price,
          sales_tax_percentage: each_item.sales_tax_percentage,
          trade_discount_percentage: each_item.trade_discount_percentage,
          gst_percentage: each_item.gst_percentage,
          foc: each_item.foc,
          item_conversion: each_item.item_conversion,
          uom: each_item.uom,
        };
      }
    );
    const purchase_order_detail = await PurchaseOrderDetail.bulkCreate(
      forBulkCreation
    );
    //
    return ResponseHelper.get(res, 200, "Success", [
      {
        po_id: purchase_order.id,
      },
    ]);
    //
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
  //
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const purchase_order = await PurchaseOrder.findAll({
      include: [PurchaseOrderDetail],
    });

    return ResponseHelper.get(res, 200, "Success", purchase_order);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const receive = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const purchase_order = await PurchaseOrder.update(
      {
        order_status: "Received",
        arrival_date: new Date(),
      },
      {
        where: { id },
      }
    );
    return ResponseHelper.get(res, 200, "Success", purchase_order);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const approve = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const purchase_order = await PurchaseOrder.update(
      {
        order_status: "Approved",
      },
      {
        where: { id },
      }
    );
    return ResponseHelper.get(res, 200, "Success", purchase_order);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const cancel = async (req: Request, res: Response) => {
  const { id, comment } = req.body;
  try {
    const purchase_order = await PurchaseOrder.update(
      {
        order_status: "Canceled",
        is_cancelled: true,
        comment: comment,
      },
      {
        where: { id },
      }
    );
    return ResponseHelper.get(res, 200, "Success", purchase_order);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const find_for_grn = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    //
    const purchase_order = await PurchaseOrder.findOne({
      attributes: [["id", "po_id"], "order_status"],
      where: {
        id,
      },
      include: [
        {
          model: PurchaseOrderDetail,
          attributes: [
            "product_id",
            "product_name",
            "required_quantity",
            ["required_quantity", "received_quantity"],
            ["trade_discount_percentage", "discount_percentage"],
            "uom",
            "trade_price",
            "foc",
          ],
        },
      ],
    });
    //
    if (purchase_order == null) {
      return ResponseHelper.get(res, 200, "No Purchase Order Found!", []);
    }
    if (
      purchase_order.order_status != "Approved" &&
      purchase_order.order_status != "Par-Received"
    ) {
      return ResponseHelper.get(
        res,
        200,
        `Purchase Order is ${purchase_order.order_status}!`,
        []
      );
    }
    //
    //
    var grn_data = await Grn.findAll({
      where: { po_id: id },
      attributes: [
        "po_id",
        "product_id",
        "product_name",
        "uom",
        ["remaining_quantity", "required_quantity"],
        ["remaining_quantity", "received_quantity"],
        "maximum_retail_price",
        "trade_price",
        "discount_percentage",
        "batch_number",
        "batch_expiry",
        "comments",
        "foc",
        "grn_status",
        "is_updatable",
        "po_status",
      ],
      raw: true,
    });
    var isGrn: boolean = grn_data.length > 0;
    //
    if (isGrn) {
      var index = 0;
      var grn_to_send: any[] = [];
      grn_data.forEach((each_grn) => {
        //@ts-ignore
        if (each_grn.is_updatable == 1 || each_grn.is_updatable) {
          grn_to_send.push({
            ...each_grn,
            index: index++,
          });
        }
      });
      if (grn_to_send.length === 0) {
        return ResponseHelper.get(
          res,
          200,
          "Purchase Order is waiting for QC Check!",
          []
        );
      }
      return ResponseHelper.get(res, 200, "Success", grn_to_send);
    }
    //

    return ResponseHelper.get(res, 200, "Success", [
      {
        ...purchase_order.dataValues,
        is_po: true,
      },
    ]);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
