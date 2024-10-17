import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './models/users.dto';
import * as bcrypt from 'bcrypt';
import { UserProfile } from './models/user.type';

/**
 * Service dealing with user-related operations.
 */
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    /**
     * Creates a new user.
     * @param createUserDto - Data transfer object containing user creation details.
     * @returns A promise that resolves when the user is created.
     */
    create = async (createUserDto: CreateUserDto) => {
        const user = new this.userModel(createUserDto);
        user.set('createdAt', new Date(Date.now()));

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        user.password = hashedPassword;

        await user.save();
    };

    /**
     * Finds a user by email.
     * @param email - The email of the user to find.
     * @returns A promise that resolves to the found user or null if no user is found.
     */
    findOne = async (email: string) => {
        return this.userModel.findOne({ email });
    };

    /**
     * Finds a user by ID.
     * @param id - The ID of the user to find.
     * @returns A promise that resolves to the found user or null if no user is found.
     */
    findById = async (id: string) => {
        return this.userModel.findById(id);
    };

    /**
     * Retrieves the profile of a user by email.
     * @param email - The email of the user whose profile is to be retrieved.
     * @returns A promise that resolves to the user's profile.
     * @throws NotFoundException if the user is not found.
     */
    userProfile = async (email: string): Promise<UserProfile> => {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new NotFoundException();
        }

        const userData = user.toObject();

        return {
            userId: userData._id.toString(),
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
            fullname: user.get('fullname'),
            dateOfBirth: userData.dateOfBirth,
            age: user.get('age'),
            sexe: userData.sexe,
            weight: userData.weight,
            height: userData.height,
        };
    };
}
