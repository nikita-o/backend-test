import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';

@ApiTags('auth')
@ApiCreatedResponse({ description: 'Успешно' })
@ApiBadRequestResponse({ description: 'Ошибка валидации данных' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @ApiConflictResponse({ description: 'Такое имя уже занято' })
  @Post('registration')
  async registration(@Body() userDto: RegistrationDto): Promise<void> {
    await this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Логин' })
  @ApiUnauthorizedResponse({ description: 'Или имя, или пароль неверно' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() login: LoginDto,
  ): Promise<void> {
    const JWTtoken = await this.authService.login(req.user);
    res.cookie('JWTtoken', JWTtoken, { httpOnly: true });
  }
}
