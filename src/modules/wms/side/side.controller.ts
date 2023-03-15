import { ResponseHelper } from "../../../helper/response.common";
import { Request, Response } from "express";
import SideDTO from "./dto/side.dto";
import Side from "./side.model";
import MyRequest from "../../../types/Request";
//
export const find_all = async (req: Request, res: Response) => {
  try {
    const response: SideDTO[] = await Side.findAll();
    return ResponseHelper.get(res, 200, "Success", response);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
//
export const add_side = async (req: MyRequest, res: Response) => {
  var { path_id, path_side_id } = req.body;
  try {
    var side_id: string = path_id + path_side_id;
    //
    const check = await Side.findOne({
      where: {
        side_id: side_id,
        loc_no: req.user_information?.loc_no,
        acc_no: req.user_information?.acc_no,
      },
    });
    if (check == null) {
      await Side.create({
        side_id,
        path_id,
        loc_no: req.user_information!.loc_no,
        acc_no: req.user_information!.acc_no,
      });
    } else {
      return ResponseHelper.get(res, 501, "Path already exists", []);
    }

    // const response: SideDTO[] = await Side.findAll();
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
//
