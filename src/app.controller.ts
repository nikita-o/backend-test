import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Res, UseGuards} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCookieAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthUserDto } from './user/dto/authUser.dto';
import { CreateUserDto } from './user/dto/createUser.dto';
import { UsersService } from './user/users.service';

@Controller()
//@UseFilters(TypeormExceptionFilter)
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({summary: 'Регистрация'})
  @ApiOkResponse({description: 'Успешная регистрация'})
  @ApiBadRequestResponse({description: 'Такое имя уже существует'})
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.usersService.add(user)    
    .catch((err)=> {  // FIXME: попытаться лучше сделать исключения, а то это кринж
      if (err.code === '23505') {
        throw new HttpException({
          message: 'this name already exists.'
        }, HttpStatus.BAD_REQUEST);
      }
      
      console.error(err);
      throw new HttpException({
        message: 'server error'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @ApiOperation({summary: 'Авторизация'})
  @ApiOkResponse({description: 'Успешная авторизация'})
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
  // @ApiOperation({summary: 'Авторизация'})
  // @ApiOkResponse({description: 'getProfile'})
  // @ApiCookieAuth()
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
