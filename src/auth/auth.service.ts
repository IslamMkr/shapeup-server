import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    validateUser = async (email: string, pass: string) => {
        const user = await this.usersService.findOne(email);

        if (user && user.password === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;

            return result;
        }

        return null;
    };
}
