import { Request, Response, NextFunction } from "express";
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    data: [],
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
export default errorHandler;
