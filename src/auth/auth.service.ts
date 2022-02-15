/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';


import { access } from 'fs';

@Injectable()
export class AuthService { 
    constructor(
        private userService: UsersSerive,
        private jwtService: JwtService) {}

   async validateUser(email: string, pass: string): Promise<User | null>  {
       const user = await this.userService.findOne(email);
       if(user && user.password === pass) {
           const {password, ...result} = user;
           return result

       }
       return null
   }

   async login(user: User) {
       const payload = { username: user, sub: user}
       return {access_token: this.jwtService.sign(payload)}
   }
}
