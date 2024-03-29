import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    exports: [AuthService],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '12h'}
        }),
        UsersModule
    ],
    controllers: [],
    providers: [AuthService, LocalStrategy, UsersService, JwtStrategy],
})
export class AuthModule { }
