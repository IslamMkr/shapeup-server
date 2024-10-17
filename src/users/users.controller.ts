import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common';
import { CreateUserDto } from './models/users.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UsersService } from './users.service';
import { UserLogin } from './models/user.type';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get('me')
    async getProfile(@Request() req) {
        const user = req.user as UserLogin;
        return await this.usersService.userProfile(user.email);
    }
}
