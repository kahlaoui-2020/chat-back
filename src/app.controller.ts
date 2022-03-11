import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Login } from './models/login.model';
import { User } from './users/entities/user.model';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService,
              private userService: UsersService) {}

  @Post('auth/login')
  async login(@Body() body: Login) {
    return this.authService.login(body)
  }
  @Post('auth/sign-up')
  async signUp(@Body() body: User) {
    return this.userService.create(body)

  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
