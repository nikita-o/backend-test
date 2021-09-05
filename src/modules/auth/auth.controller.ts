import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(@Body() userDto: RegistrationDto): Promise<void> {
    await this.authService.registration(userDto);
  }

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ): Promise<void> {
    const JWTtoken = await this.authService.login(req.user);
    res.cookie('JWTtoken', JWTtoken, { httpOnly: true });
  }
}
