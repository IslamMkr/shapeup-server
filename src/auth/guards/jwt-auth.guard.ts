import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * JwtAuthGuard is a custom authentication guard that extends the default AuthGuard
 * provided by the @nestjs/passport package. It uses the 'jwt' strategy for authentication.
 *
 * @class
 * @extends {AuthGuard('jwt')}
 *
 * @constructor
 * @param {Reflector} reflector - An instance of the Reflector class used to access metadata.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    /**
     * Determines if the current request is allowed to proceed. It checks if the route
     * is marked as public using metadata. If the route is public, it allows the request
     * to proceed without authentication. Otherwise, it delegates to the parent class's
     * canActivate method to perform JWT authentication.
     *
     * @param {ExecutionContext} context - The execution context of the request.
     * @returns {boolean | Promise<boolean>} - Returns true if the route is public, otherwise it
     */
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}
