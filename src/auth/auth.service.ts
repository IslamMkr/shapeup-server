import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    validateUser = async (email: string, pass: string) => {
        const user = await this.usersService.findOne(email);

        if (user && user.password === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;

            return result;
        }

        return null;
    };

    login = (user: any) => {
        const payload = {
            email: user.email,
            username: user.username,
            sub: user.userId,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    };
}
