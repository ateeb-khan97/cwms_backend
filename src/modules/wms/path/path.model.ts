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
import PathDTO from "./dto/path.dto";
@Table({ tableName: "path", initialAutoIncrement: "1000" })
export default class Path extends Model<PathDTO> {
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
