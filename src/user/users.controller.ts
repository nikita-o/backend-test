import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({description: 'found all', type: [UserDto]})
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({description: 'OK', type: UserDto})
  @Get(':id')
  async get(@Param('id') id: number) {
    let user = await this.usersService.FindById(id);
    
    return user;
  }

  // @ApiOkResponse({description: 'ok'})
  // @ApiCookieAuth()
  // @UseGuards(JwtAuthGuard)
  // @Put() 
  // update(@Req() req, @Body() user: UpdateUserDto) {
  //   this.usersService.update(req.user.userId, user);
  // }

  // @ApiOkResponse({description: 'OK'})
  // @ApiCookieAuth()
  // @UseGuards(JwtAuthGuard)
  // @Delete()  
  // delete(@Req() req) {
  //   this.usersService.remove(req.user.userId);
  // }

}