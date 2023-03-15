import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
//
@Table({ tableName: "inward_master", initialAutoIncrement: "99000000000" })
export default class InwardMaster extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column({ type: "BIGINT" })
  inward_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
