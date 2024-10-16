import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            email: 'e@e.fr',
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            email: 'ededadfea@efea.fr',
            username: 'chris',
            password: 'secret',
        },
    ];

    findOne = async (email: string) => {
        return this.users.find((user) => user.email === email);
    };
}
