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
import RackDTO from "./dto/rack.dto";
@Table({ tableName: "rack", initialAutoIncrement: "1000" })
export default class Rack extends Model<RackDTO> {
  @Column
  rack_id: string;

  @Column
  side_id: string;

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
