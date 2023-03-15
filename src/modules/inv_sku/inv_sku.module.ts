import myDate from "../../helper/date.common";
import { GrnType } from "../grn/dto/grn.type";
import ProductConversion from "../product/product-conversion.model";
import InventorySkuDetail from "./entities/InventoryDetail.entity";
import InventorySku from "./entities/InventorySKU.entity";
import InwardMaster from "./entities/InwardMaster.entity";

export default class InvSkuModule {
  //
  static async create_child(
    acc_no: string,
    loc_no: string,
    user_name: string,
    id: number
  ) {
    const { inward_id } = await InwardMaster.create({});
    const inward_sku = await InventorySku.findOne({
      attributes: ["uom", "received_quantity", "product_id"],
      where: { id },
      raw: true,
    });
    //
    const product_conversion = await ProductConversion.findAll({
      where: {
        product_id: inward_sku?.product_id,
      },
      group: "sorting",
      raw: true,
    });
    console.log(product_conversion);

    //

    const new_id = inward_sku!.product_id + "~" + inward_id;
    await InventorySku.update(
      {
        inward_date: myDate(),
        inward_id: new_id,
      },
      { where: { id } }
    );
    //
    const childData: any[] = [];
    for (let i = 1; i <= +inward_sku!.received_quantity; i++) {
      childData.push({
        inward_id: new_id,
        inward_child: new_id + "~" + i,
        account_number: acc_no,
        location_id: loc_no,
        qc_status: false,
        user_name: user_name,
        product_id: inward_sku?.product_id,
      });
    }
    InventorySkuDetail.bulkCreate(childData);
    //
  }
  //
  static async create(
    data: GrnType,
    account_number: string,
    location_id: string
  ) {
    await InventorySku.create({
      po_id: data.po_id,
      product_id: data.product_id,
      product_name: data.product_name,
      required_quantity: data.required_quantity.toString(),
      received_quantity: data.received_quantity.toString(),
      maximum_retail_price: data.maximum_retail_price,
      trade_price: data.trade_price,
      discount_percentage: data.discount_percentage.toString(),
      batch_number: data.batch_number,
      batch_expiry: data.batch_expiry,
      comments: data.comments,
      foc: data.foc,
      uom: data.uom,
      location_id: location_id,
      account_number: account_number,
      status: true,
    });
  }
  //
  static async find(account_number: string, location_id: string) {
    return await InventorySku.findAll({
      raw: true,
      where: {
        account_number,
        location_id,
      },
    });
  }
}
