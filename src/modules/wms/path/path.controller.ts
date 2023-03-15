import { ResponseHelper } from "../../../helper/response.common";
import { Request, Response } from "express";
import PathDTO from "./dto/path.dto";
import Path from "./path.model";
import sequelize from "../../../db_config";
import MyRequest from "../../../types/Request";
//
export const find_all = async (req: Request, res: Response) => {
  try {
    const response: PathDTO[] = await Path.findAll();
    return ResponseHelper.get(res, 200, "Success", response);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
//
export const add_path = async (req: MyRequest, res: Response) => {
  try {
    await sequelize.query(
      `INSERT INTO path (path_id, acc_no, loc_no) VALUES ((SELECT if(count(*) = 0 ,'P01',path_id) AS path_id from (SELECT CONCAT("P",LPAD(ifnull(Right(path_id, 2),0)+1,2,0)) AS path_id FROM path where loc_no=1 AND acc_no='KHI-WMS-1000' order by path_id DESC limit 0,1) t),'${req.user_information?.acc_no}','${req.user_information?.loc_no}')`
    );

    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err, []);
  }
};
