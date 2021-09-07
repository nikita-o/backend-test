import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { UpdateUserDto } from './dto/updateUserDto.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBadRequestResponse({ description: 'Ошибка валидации данных' })
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение пользователей постранично' })
  @Get('page/:index')
  async getPage(@Param('index') index: number): Promise<User[]> {
    return await this.userService.getPage(index);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение пользователя по имени' })
  @Get('getByName/:name')
  async getByName(@Param('name') name: string): Promise<User> {
    return await this.userService.getByName(name);
  }

  @ApiOperation({ summary: 'Обновление данных пользователя' })
  @ApiOkResponse({ description: 'Успешно' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req, @Body() user: UpdateUserDto): Promise<void> {
    await this.userService.update(req.user.id, user);
  }

  // @ApiOkResponse({ description: 'Успешно' })
  // @ApiOperation({ summary: 'Удаление пользователя' })
  // @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  // @ApiCookieAuth()
  // @UseGuards(JwtAuthGuard)
  // @Delete()
  // async delete(@Req() req): Promise<void> {
  //   await this.userService.delete(req.user.id);
  // }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    return await this.userService.getById(id);
  }
}
