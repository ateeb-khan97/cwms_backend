import { ResponseHelper } from "../../helper/response.common";
import { Request, Response } from "express";
//
import LocationDTO from "./dto/location.dto";
import Location from "./location.model";
import MyRequest from "../../types/Request";
//
export const create = async (req: Request, res: Response) => {
  const location_data: LocationDTO = req.body;
  try {
    const location = await Location.create(location_data);
    return ResponseHelper.get(res, 200, "Success", [location]);
  } catch (err: any) {
    console.log(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findAll = async (req: Request, res: Response) => {
  const { account_number } = req.body;
  try {
    const location = await Location.findAll({
      where: { account_number },
    });
    return ResponseHelper.get(res, 200, "Success", location);
  } catch (err: any) {
    console.log(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};

export const findForDropDown = async (req: MyRequest, res: Response) => {
  const { acc_no } = req.user_information!;
  try {
    const location = await Location.findAll({
      where: { account_number: acc_no },
      attributes: ["loc_code", "loc_name"],
    });
    return ResponseHelper.get(res, 200, "Success", location);
  } catch (err: any) {
    console.log(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
