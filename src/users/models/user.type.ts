export type UserLogin = {
    userId: string;
    email: string;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
};

export type UserProfile = {
    age: number;
    sexe: string;
    weight: number;
    height: number;
    fullname: string;
} & UserLogin;
