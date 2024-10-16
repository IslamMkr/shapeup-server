import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsStrongPassword,
    Length,
    Max,
    Min,
    MinDate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export enum Sexe {
    Male = 'Male',
    Female = 'Female',
}

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @Length(2, 30)
    firstName: string;

    @IsNotEmpty()
    @Length(2, 30)
    lastName: string;

    age: number;

    @IsDate()
    @IsNotEmpty()
    @MinDate(new Date('1950-01-01'))
    dateOfBirth: Date;

    @IsNotEmpty()
    sexe: Sexe;

    @IsNotEmpty()
    @IsNumber()
    @Min(30)
    @Max(500)
    weight: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(50)
    @Max(300)
    height: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
