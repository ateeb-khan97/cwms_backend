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
import SideDTO from "./dto/side.dto";
@Table({ tableName: "side", initialAutoIncrement: "1000" })
export default class Side extends Model<SideDTO> {
  @Column
  side_id: string;

  @Column
  path_id: string;

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
