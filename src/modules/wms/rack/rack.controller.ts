import { ResponseHelper } from "../../../helper/response.common";
import { Request, Response } from "express";
import RackDTO from "./dto/rack.dto";
import Rack from "./rack.model";
import MyRequest from "../../../types/Request";
//
export const find_all = async (req: Request, res: Response) => {
  try {
    const response: RackDTO[] = await Rack.findAll();
    return ResponseHelper.get(res, 200, "Success", response);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
//
export const add_shelf = async (req: MyRequest, res: Response) => {
  try {
    var rack_id = "";
    const check_response = await Rack.findOne({
      order: [["id", "DESC"]],
      raw: true,
      attributes: ["rack_id"],
      where: {
        acc_no: req.user_information?.acc_no,
        loc_no: req.user_information?.loc_no,
        side_id: req.body.side_id,
      },
    });
    if (!check_response) {
      rack_id = req.body.side_id + "S01";
    } else {
      let current_id: number = +check_response.rack_id.slice(-2);
      let new_id = (current_id + 1).toString().padStart(2, "0");
      rack_id = req.body.side_id + `S${new_id}`;
    }

    const data = {
      ...req.user_information,
      ...req.body,
      rack_id,
    };
    await Rack.create({
      ...data,
    });
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
