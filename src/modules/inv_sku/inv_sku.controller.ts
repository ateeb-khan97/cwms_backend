import { Response } from "express";
import { ResponseHelper } from "../../helper/response.common";
import MyRequest from "../../types/Request";
import InvSkuModule from "./inv_sku.module";
//
export default class InventorySKUController {
  static async create_child(req: MyRequest, res: Response) {
    try {
      const acc_no = req.user_information!.acc_no;
      const loc_no = req.user_information!.loc_no;
      const user_name = req.user_information!.user_name;
      const { id } = req.body;

      await InvSkuModule.create_child(acc_no, loc_no, user_name, id);
      return ResponseHelper.get(res, 200, "Child Generated Successfully", []);
      //
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
  //
  static async find_all(req: MyRequest, res: Response) {
    try {
      const response = await InvSkuModule.find(
        req.user_information!.acc_no,
        req.user_information!.loc_no
      );
      return ResponseHelper.get(res, 200, "Success", response);
    } catch (err: any) {
      return ResponseHelper.get(res, 500, err.message, []);
    }
  }
}
