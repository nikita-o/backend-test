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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { UpdateUserDto } from './dto/updateUserDto.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'постранично' })
  @Get('page/:index')
  async getPage(@Param('index') index: number): Promise<User[]> {
    return await this.userService.getPage(index);
  }

  @Get('getByName/:name')
  async getByName(@Param('name') name: string): Promise<User> {
    return await this.userService.getByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req, @Body() user: UpdateUserDto): Promise<void> {
    await this.userService.update(req.user.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req): Promise<void> {
    await this.userService.delete(req.user.id);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    return await this.userService.getById(id);
  }
}
