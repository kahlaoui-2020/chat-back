import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Login } from './models/login.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body: Login) {
    console.log(body);
    return this.authService.login(body)
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
