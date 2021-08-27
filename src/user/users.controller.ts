import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({description: 'found all', type: [User]})
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({description: 'OK', type: User})
  @Get(':id')
  get(@Param('id') id: number) {
    return this.usersService.FindById(id);
  }

  @ApiOkResponse({description: 'ok'})
  @UseGuards(JwtAuthGuard)
  @Put() 
  update(@Req() req, @Body() user) {
    this.usersService.update(req.user.userId, user);
  }

  @ApiOkResponse({description: 'OK'})
  @UseGuards(JwtAuthGuard)
  @Delete()  
  delete(@Req() req) {
    this.usersService.remove(req.user.userId);
  }

}