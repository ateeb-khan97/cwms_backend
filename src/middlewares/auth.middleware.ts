import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import MyRequest from "../types/Request";
//
const protect = asyncHandler(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];
        // Verify Token
        const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        //

        const data = JSON.parse(
          req.rawHeaders[req.rawHeaders.indexOf("X-Custom-Header") + 1]
        );

        req.user_information = data;

        next();
      } catch (error: any) {
        console.log(error);
        res.status(401);
        throw new Error(error.message);
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
export default protect;
