import { Request } from "express";
type UserInformation = {
  acc_no: string;
  loc_no: string;
  user_name: string;
};
export default interface MyRequest extends Request {
  user_information?: UserInformation;
}
