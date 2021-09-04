import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(@Body() userDto: RegistrationDto): Promise<void> {
    await this.authService.registration(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any, @Res() res: any): Promise<void> {
    const JWTtoken = await this.authService.login(req.user);
    res.cookie('JWTtoken', JWTtoken, { httpOnly: true });
  }
}
