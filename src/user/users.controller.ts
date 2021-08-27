import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.usersService.FindById(id);
  }

  // убрать?
  @UseGuards(JwtAuthGuard)
  @Put() 
  update(@Req() req, @Body() user) {
    this.usersService.update(req.user.userId, user);
  }

  // убрать?
  @UseGuards(JwtAuthGuard)
  @Delete()  
  delete(@Req() req) {
    this.usersService.remove(req.user.userId);
  }

}