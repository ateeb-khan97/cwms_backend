import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import BinDTO from "./dto/bin.dto";
@Table({ tableName: "bin", initialAutoIncrement: "1000" })
export default class Bin extends Model<BinDTO> {
  @Column
  bin_id: string;

  @Column
  rack_id: string;

  @Column
  sorting: number;

  @Column
  acc_no: string;

  @Column
  loc_no: string;

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
