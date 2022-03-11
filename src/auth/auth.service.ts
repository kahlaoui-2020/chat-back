/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { Login } from 'src/models/login.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user) return user
        throw new Error()
    }

    async login(login: Login) {
        let user: UserEntity;
        try {
            user = await this.validateUser(login.email, login.password);

        } catch (err) {
            throw new UnauthorizedException(
                `There isn't any user with email: ${login.email}`,
            );
        }
        if (!(await user.checkPassword(login.password)))
            throw new UnauthorizedException(
                `Wrong password for user with email: ${login.email}`,
            );


        const payload = { email: login.email, userId: user.id }
        return { access_token: this.jwtService.sign(payload) }
    }

    decode(token: string): {email: string, userId: string} {
        return this.jwtService.decode(token) as { email: string, userId: string}
    }

}
