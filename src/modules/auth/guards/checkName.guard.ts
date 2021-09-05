import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CheckNameGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    //console.log(request);
    return true;
  }
}
