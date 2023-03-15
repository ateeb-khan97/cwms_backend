import jwt from "jsonwebtoken";
//
const generateAccessToken = (acc_no: any, loc_no: any, type: any) => {
  return jwt.sign({ acc_no, loc_no, type }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export default generateAccessToken;
