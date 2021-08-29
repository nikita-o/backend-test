import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthUserDto } from './user/dto/authUser.dto';
import { CreateUserDto } from './user/dto/CreateUser.dto';
import { User } from './user/entities/user.entity';
import { UsersService } from './user/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({summary: 'Регистрация'})
  @ApiOkResponse({description: 'register'})
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Body() user: CreateUserDto) {
    this.usersService.add(user)
    .then(() => 'OK!')
    .catch((e) => {
      console.error(e);
      return 'FUCK!';
    });
  }

  @ApiOperation({summary: 'Аутификация'})
  @ApiOkResponse({description: 'login'})
  @ApiBody({type: AuthUserDto})
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {    
    let JWTtoken = await this.authService.login(req.user);
    res.cookie('JWTtoken', JWTtoken.access_token, {httpOnly: true});
  }

  // @ApiOkResponse({description: 'logout'})
  // @Get('logout')
  // async logout(@Request() req, @Res({ passthrough: true }) res) {    
  //   req.logout();
  // }

  // редирект на просмотр юзера?
  @ApiOperation({summary: 'Авторизация'})
  @ApiOkResponse({description: 'getProfile'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
