import { ResponseHelper } from "../../../helper/response.common";
import { Request, Response } from "express";
import BinDTO from "./dto/bin.dto";
import Bin from "./bin.model";
import MyRequest from "../../../types/Request";
//
export const find_all = async (req: Request, res: Response) => {
  try {
    const response: BinDTO[] = await Bin.findAll();
    return ResponseHelper.get(res, 200, "Success", response);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
//
export const add_bin = async (req: MyRequest, res: Response) => {
  try {
    var bin_id = "";
    const check_response = await Bin.findOne({
      order: [["id", "DESC"]],
      raw: true,
      attributes: ["bin_id"],
      where: {
        acc_no: req.user_information?.acc_no,
        loc_no: req.user_information?.loc_no,
        rack_id: req.body.rack_id,
      },
    });
    if (!check_response) {
      bin_id = req.body.rack_id + "B01";
    } else {
      let current_id: number = +check_response.bin_id.slice(-2);
      let new_id = (current_id + 1).toString().padStart(2, "0");
      bin_id = req.body.rack_id + `S${new_id}`;
    }

    const data = {
      ...req.user_information,
      ...req.body,
      bin_id,
    };
    await Bin.create({
      ...data,
    });
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
