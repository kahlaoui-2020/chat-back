import { User } from "../entities/user.model";
import {IsNotEmpty } from 'class-validator';

export class CreateUserDto implements User {

    
    id?: string;
    lastName: string;
    firstName: string;
    dateOfBirth?: Date;
    email: string;
    password?: string;
    registrationDate?: Date;
    picture?: string;
}
