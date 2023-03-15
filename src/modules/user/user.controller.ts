import { Request, Response } from "express";
import UserDTO from "./dto/user.dto";
import User from "./user.model";
import bcrypt from "bcryptjs";
import generateAccessToken from "../../functions/generate_token";
import { ResponseHelper } from "../../helper/response.common";
//
export const login = async (req: Request, res: Response) => {
  const { user_id, password } = req.body;
  if (user_id != "" && password != "") {
    const user = await User.findOne({ where: { user_id } });
    if (!user) {
      return ResponseHelper.get(res, 404, "User not found!", []);
    }
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(
        user.account_number,
        user.loc_code,
        user.type
      );
      return ResponseHelper.get(res, 200, "Login successfully!", [
        {
          token: accessToken,
          type: user.type,
          user_id: user.user_id,
          user_name: user.user_name,
          acc_no: user.account_number,
          loc_no: user.loc_code,
        },
      ]);
    } else {
      return ResponseHelper.get(res, 400, "Invalid user_id or password!", []);
    }
  }
  return ResponseHelper.get(
    res,
    500,
    "user_id and password cannot be empty!",
    []
  );
};
//
export const register = async (req: Request, res: Response) => {
  const user_data: UserDTO = req.body;
  try {
    if (user_data.user_id == "" || user_data.password == "") {
      return ResponseHelper.get(
        res,
        500,
        "user_id and password cannot be empty!",
        []
      );
    }

    const user_already_exist: boolean = await userCheckerFunction(
      user_data.user_id
    );
    const email_already_exist: boolean = await userEmailCheckerFunction(
      user_data.email
    );

    if (user_already_exist) {
      return ResponseHelper.get(res, 500, "User already exist!", []);
    }
    if (email_already_exist) {
      return ResponseHelper.get(res, 500, "Email already exist!", []);
    }
    //   Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(user_data.password, salt);
    //
    // Create User
    const user = await User.create({
      ...user_data,
      password: hashedPassword,
    });
    //
    if (user) {
      const accessToken = generateAccessToken(
        user.account_number,
        user.loc_code,
        user.type
      );

      return ResponseHelper.get(res, 200, "User created successfully!", [
        {
          token: accessToken,
        },
      ]);
    }

    return ResponseHelper.get(res, 500, "Invalid Data!", []);
  } catch (err: any) {
    return ResponseHelper.get(res, 500, err.message, []);
  }
  //
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.findAll({
      attributes: [
        "id",
        "user_name",
        "user_id",
        "account_number",
        "email",
        "phone_number",
        "status",
      ],
    });
    return res.json({
      message: "Success",
      status: 200,
      data: allUsers,
    });
  } catch (err: any) {
    console.log(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
const userCheckerFunction = async (user_id: string): Promise<boolean> => {
  const UserExist = await User.findOne({
    where: {
      user_id,
    },
  });

  if (UserExist) return true;
  return false;
};
const userEmailCheckerFunction = async (email: string): Promise<boolean> => {
  const UserExist = await User.findOne({
    where: {
      email,
    },
  });

  if (UserExist) return true;
  return false;
};
//
