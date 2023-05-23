import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthUser } from 'src/decorators/auth-user.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { UserGetAllDto } from './dto/res/user-get-all.dto'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //   @ApiOperation({ summary: 'Создание пользователя' })
  //   @ApiResponse({ status: 200, type: AuthRegisterResponceDto })
  //   @Post()
  // create(@Body() authDto: UserCreateDto) {
  //   return this.userService.register(authDto)
  // }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: UserGetAllDto })
  @UseGuards(AuthGuard)
  @Get()
  getAll(@AuthUser() user: UserDto) {
    return this.userService.getAll(user)
  }
}
