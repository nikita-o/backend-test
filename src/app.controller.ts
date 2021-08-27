import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './user/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  register(@Body() user) {
    this.usersService.add(user)
    .then(() => 'OK!')
    .catch((e) => {
      console.error(e);
      return 'FUCK!';
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    let JWTtoken = await this.authService.login(req.user);
    res.cookie('JWTtoken', JWTtoken.access_token, {httpOnly: true});
    
    return 'Success!';
  }

  // редирект на просмотр юзера?
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
