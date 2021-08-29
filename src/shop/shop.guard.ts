import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ShopGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();
    console.log(req.params);
    console.log(req.user);
    console.log(req.body);
    
    //console.log(req);
    
    return true;
  }
}
