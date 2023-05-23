import { ApiProperty } from '@nestjs/swagger'
import { User } from '../user/user.entity'
import { DataTypes } from 'sequelize'
import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript'

@Table({ tableName: 'files' })
export class File extends Model<File> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  access_link: string

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  size: number

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  path: string

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  parentId: string

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  parentName: string

  @ApiProperty({
    required: true,
  })
  @Column({
    type: DataType.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  })
  childs: string[]
}
