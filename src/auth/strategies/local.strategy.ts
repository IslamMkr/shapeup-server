import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { UserLogin } from 'src/users/models/user.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private moduleRef: ModuleRef) {
        super({
            usernameField: 'email',
            passReqToCallback: true,
        });
    }

    validate = async (
        request: Request,
        email: string,
        password: string,
    ): Promise<UserLogin> => {
        const contextId = ContextIdFactory.getByRequest(request);
        const authService = await this.moduleRef.resolve(
            AuthService,
            contextId,
        );

        const user = await authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    };
}
