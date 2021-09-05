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
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { UpdateUserDto } from './dto/updateUserDto.dto';
import { UserService } from './user.service';

@ApiTags('user')
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

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Обновление данных пользователя' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req, @Body() user: UpdateUserDto): Promise<void> {
    await this.userService.update(req.user.id, user);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req): Promise<void> {
    await this.userService.delete(req.user.id);
  }

  @ApiOkResponse({ description: 'Успешно' })
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    return await this.userService.getById(id);
  }
}
