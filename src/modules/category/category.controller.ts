import Category from "./category.model";
import { Request, Response } from "express";
import CategoryDTO from "./dto/category.dto";
import Product from "../product/product.model";
import { ResponseHelper } from "../../helper/response.common";
import sequelize from "../../db_config";
import { QueryTypes } from "sequelize";
//
export const create = async (req: Request, res: Response) => {
  const category_dto: CategoryDTO = req.body;
  try {
    const category = await Category.create(category_dto);
    return ResponseHelper.get(res, 200, "Success", [category]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const category = await Category.findAll({ raw: true });

    //
    return ResponseHelper.get(res, 200, "Success", category);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
//
export const find = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const category = await Category.findOne({
      where: { id },
    });
    return ResponseHelper.get(res, 200, "Success", [category]);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};

export const update = async (req: Request, res: Response) => {
  const category_dto: CategoryDTO = req.body;

  try {
    await Category.update(category_dto, {
      where: { id: category_dto.id },
    });
    return ResponseHelper.get(res, 200, "Success", []);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
export const findForDropDown = async (req: Request, res: Response) => {
  try {
    const category = await sequelize.query(
      `SELECT sub_p.id, sub_p.category_name,(SELECT category_name from categories WHERE id = sub_p.parent_id) AS parent_name FROM categories as sub_p where category_level = "Sub Level" AND status = true;`,
      { raw: true, type: QueryTypes.SELECT }
    );
    console.log(category);

    return ResponseHelper.get(res, 200, "Success", category);
  } catch (err: any) {
    console.error(err);
    return ResponseHelper.get(res, 500, err.message, []);
  }
};
