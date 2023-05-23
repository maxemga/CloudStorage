import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { DataTypes } from 'sequelize'
import { File } from '../files/file.entity'

@Table({ tableName: 'users' })
export class User extends Model<User> {
  // @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string

  @ApiProperty({
    example: 'maxemga22gmail.com',
    description: 'Почта',
    required: true,
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string

  @ApiProperty({ example: '1324324', description: 'Пароль', required: true })
  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  password: string

  @ApiProperty({ example: 'maxemga', description: 'Логин', required: true })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string

  @ApiProperty({ example: 'Максим', description: 'Имя', required: true })
  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  firstName: string

  @ApiProperty({ example: 'Фефилов', description: 'Фамилия', required: true })
  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  lastName: string

  @ApiProperty({ example: 'Фефилов', description: 'Фамилия', required: true })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  usedStorage: number

  // @ApiProperty({ example: 'Фефилов', description: 'Фамилия', required: true })
  @HasMany(() => File)
  files: File[]

  @ApiProperty({ example: 'false', description: '' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVerify: boolean
}
