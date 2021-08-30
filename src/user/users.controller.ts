import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Вернуть всех пользователей'})
  @ApiOkResponse({description: 'Получены все пользователи', type: [UserDto]})
  @Get()
  getAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: 'Вернуть пользователя по id'})
  @ApiOkResponse({description: 'Получен пользователь', type: UserDto})
  @Get(':id')
  get(@Param('id') id: number): Promise<UserDto | undefined> {
    return this.usersService.FindById(id);
  }

  @ApiOperation({summary: 'Обновить данные текущего пользователя'})
  @ApiOkResponse({description: 'Данные пользователя обновлены'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Put() 
  update(@Req() req: any, @Body() user: UpdateUserDto) {
    this.usersService.update(req.user.userId, user);
  }

  // @ApiOperation({summary: 'Обновить пароль текущего пользователя'})
  // @ApiOkResponse({description: 'ok'})
  // @ApiCookieAuth()
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(LocalAuthGuard)
  // @Put('/updatePassword') 
  // updatePassword(@Req() req) {
  //   this.usersService.updatePassword(req.user.userId, req.body.newPassword);
  // }

  // TODO: обнулять время токена! (не достаточно удалить из куки)
  @ApiOperation({summary: 'Удалить текущего пользователя'})
  @ApiOkResponse({description: 'Пользователь удален'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()  
  delete(@Req() req: any) {
    this.usersService.deleteUser(req.user.userId);
  }
}