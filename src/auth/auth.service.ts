import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    signIn = async (username: string, pass: string) => {
        const user = await this.usersService.findOne(username);

        if (user.password !== pass) {
            return new UnauthorizedException();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
    };
}
