import { DataTypes } from 'sequelize'
import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { VerifyEnum } from 'src/common/enums/verification-enum'

@Table({ tableName: 'verification' })
export class VerifyUser extends Model<VerifyUser> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string

  @Column({
    type: DataType.STRING,
  })
  userEmail: string

  @Column({
    type: DataType.STRING,
  })
  type: VerifyEnum

  @Column({
    type: DataType.INTEGER,
  })
  code: number
}
