import { ForbiddenException, CanActivate, Injectable, ExecutionContext  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs/internal/Observable';
import { Role } from 'src/roles/roles.enum';

@Injectable() 
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ){}
    
     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        
                const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
                    context.getHandler(),
                    context.getClass()
                ]);
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.roles) {
            throw new ForbiddenException('User roles not defined');
          }
        const valid = user && user.roles && requiredRoles.some(role => user.roles.includes(role))           
        if(!valid) {
            throw new ForbiddenException(
                'You do not have permission and are not allowed to access this route'
            );
        }
        return valid
    }
}