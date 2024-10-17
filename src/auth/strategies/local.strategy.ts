import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { UserLogin } from 'src/users/models/user.type';

/**
 * LocalStrategy class extends PassportStrategy to implement local authentication.
 *
 * @class LocalStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private moduleRef: ModuleRef) {
        super({
            usernameField: 'email',
            passReqToCallback: true,
        });
    }

    /**
     * Validates the user credentials and returns the authenticated user.
     *
     * @param request - The HTTP request object.
     * @param email - The email address of the user.
     * @param password - The password of the user.
     * @returns A promise that resolves to the authenticated user.
     * @throws {UnauthorizedException} If the user credentials are invalid.
     */
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
