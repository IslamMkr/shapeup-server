import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserLogin } from 'src/users/models/user.type';

/**
 * JwtStrategy class extends the PassportStrategy with JWT strategy.
 * It is used to handle JWT authentication in the application.
 *
 * @class
 * @extends {PassportStrategy(Strategy)}
 *
 * @constructor
 * @param {ConfigService} configService - The configuration service to access environment variables.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }
    /**
     * Validates the user login information extracted from the JWT.
     *
     * @param {UserLogin} userLogin - The user login information extracted from the JWT.
     * @returns {Promise<UserLogin>} - Returns the user login information.
     */
    validate = (userLogin: UserLogin) => {
        return userLogin;
    };
}
