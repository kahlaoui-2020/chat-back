import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Login } from './models/login.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService) {}

  @Get('auth/login')
  async login(@Body() body: Login) {
    return this.authService.login(body)
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
