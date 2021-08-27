import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':name')
  get(@Param('name') name: string) {
    return this.usersService.findByName(name);
  }

  // @Get(':id')
  // get(@Param('id') id: number) {
  //   return this.usersService.findOne(id);
  // }

  @Post()
  create(@Body() user) {
    this.usersService.add(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user) {
    this.usersService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.usersService.remove(id);
  }

}