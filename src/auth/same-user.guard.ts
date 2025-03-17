import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../users/user.entity'; // Assuming you use Role enum

@Injectable()
export class SameUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const path = request.url;
    console.log("paaath", path)
    console.log(request.user)
    const user = request.user; // assuming user is attached via some middleware (like JWT Auth)
    console.log(user.role)
       // Check if the user is trying to access their own cart
       const params = request.params;
      if (user.role === Role.ADMIN) {
        return true;
      } else if (user.id === parseInt(params.id, 10)) {
        return true;
      } else {
        throw new ForbiddenException('neither the same user nor admin');
      }
  }

  
}
