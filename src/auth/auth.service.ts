import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserLogin } from 'src/users/models/user.type';

/**
 * AuthService handles authentication-related operations.
 *
 * @class
 * @classdesc This service provides methods to validate users and generate JWT tokens.
 *
 * @param {UsersService} usersService - Service to handle user-related operations.
 * @param {JwtService} jwtService - Service to handle JWT operations.
 */
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    /**
     * Validates a user by their email and password.
     *
     * @async
     * @param {string} email - The email of the user to validate.
     * @param {string} pass - The password of the user to validate.
     * @returns {Promise<Object>} The validated user object containing userId, email, firstname, lastname, and dateOfBirth.
     * @throws {NotFoundException} If the user is not found.
     * @throws {HttpException} If the password does not match.
     */
    validateUser = async (email: string, pass: string) => {
        const user = await this.usersService.findOne(email);

        if (!user) {
            throw new NotFoundException();
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid credentials', 401);
        }

        const validatedUser = user.toObject();

        return {
            userId: validatedUser._id.toString(),
            email: validatedUser.email,
            firstname: validatedUser.firstname,
            lastname: validatedUser.lastname,
            dateOfBirth: validatedUser.dateOfBirth,
        };
    };

    /**
     * Generates a JWT token for a given user login.
     *
     * @param {UserLogin} userLogin - The user login object containing user details.
     * @returns {Object} An object containing the access token.
     */
    login = (userLogin: UserLogin) => {
        return {
            access_token: this.jwtService.sign(userLogin),
        };
    };
}
