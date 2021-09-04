import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('test')
  test(): string {
    return 'I,m are LIVE!';
  }
}
