import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1] ?? '';

        if(!token) {
            throw new UnauthorizedException('Bearer token not found')
        }
        try {
            const secret = process.env.JWT_SECRET
            const payload = await this.jwtService.verifyAsync(token, {secret})
            payload.roles = ['Client'];
            request.user = payload;
            return true

        } catch (error) {
            throw new UnauthorizedException('Invalid Token')
        }
    }
}