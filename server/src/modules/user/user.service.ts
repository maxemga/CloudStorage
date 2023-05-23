import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserCreateDto } from './dto/req/user-create.dto'
import { UserDto } from './dto/user.dto'
import { User } from './user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userEntity: typeof User) {}

  async create(dto: UserCreateDto) {
    const user = await this.userEntity.create(dto)
    return user
  }

  async getAll(user: UserDto) {
    const users = await this.userEntity.findAll({ include: { all: true } })
    return users
  }

  async getById(id: string) {
    const user = await this.userEntity.findOne({
      where: { id },
    })

    return user
  }

  async getByEmailNonVerify(email: string) {
    const user = await this.userEntity.findOne({
      where: { email },
      include: { all: true },
    })
    return user
  }

  async getByLoginNonVerify(login: string) {
    const user = await this.userEntity.findOne({ where: { login } })
    return user
  }

  async getByEmail(email: string) {
    const user = await this.userEntity.findOne({
      where: { email, isVerify: true },
      include: { all: true },
    })
    return user
  }

  async update(dto: Partial<UserDto>) {
    return await this.userEntity.update(dto, {
      where: { email: dto.email },
    })
  }

  async changePassword(email: string, password: string) {
    const user = await this.getByEmail(email)

    const hashPassword = await bcrypt.hash(password, 4)

    user.password = hashPassword
    user.save()

    return user
  }
}
