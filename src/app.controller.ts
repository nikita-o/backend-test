import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './user/user.entity';
import { UsersService } from './user/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiOkResponse({description: 'register'})
  @Post('register')
  register(@Body() user: User) {
    this.usersService.add(user)
    .then(() => 'OK!')
    .catch((e) => {
      console.error(e);
      return 'FUCK!';
    });
  }

  @ApiOkResponse({description: 'login'})
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    let JWTtoken = await this.authService.login(req.user);
    res.cookie('JWTtoken', JWTtoken.access_token, {httpOnly: true});
    
    return 'Success!';
  }

  // редирект на просмотр юзера?
  @ApiOkResponse({description: 'getProfile'})
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
