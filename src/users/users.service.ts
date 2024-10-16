import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'chris',
            password: 'secret',
        },
    ];

    findOne = async (username: string) => {
        return this.users.find((user) => user.username === username);
    };
}
