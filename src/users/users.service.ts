import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './models/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    create = async (createUserDto: CreateUserDto) => {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    };

    findOne = async (email: string) => {
        return this.userModel.findOne({ email });
    };
}
