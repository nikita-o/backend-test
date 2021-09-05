import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { CheckNameGuard } from './guards/checkName.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @ApiCreatedResponse({ description: 'Успешная регистрация' })
  @UseGuards(CheckNameGuard)
  @Post('registration')
  async registration(@Body() userDto: RegistrationDto): Promise<void> {
    await this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Логин' })
  @ApiCreatedResponse({ description: 'Успешная авторизация' })
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
