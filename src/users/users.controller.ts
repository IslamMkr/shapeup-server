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

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
