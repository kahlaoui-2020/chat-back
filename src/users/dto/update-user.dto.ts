import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    lastName?: string;
    firstName?: string;
    dateOfBirth?: Date;
    email?: string;
    password?: string;
    picture?: string;
}
