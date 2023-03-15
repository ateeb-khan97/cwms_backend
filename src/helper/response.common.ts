import { Response } from "express";

export class ResponseHelper {
  static async get(res: Response, status: number, info: any, data: any) {
    console.log(info);

    if (status == 500) {
      return res.json({
        status,
        message: info,
        data: data,
      });
    }
    return res.json({
      status: status,
      message: info,
      data: data,
    });
  }
}
