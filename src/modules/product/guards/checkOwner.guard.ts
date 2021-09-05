import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CheckGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    return true;
  }
}
