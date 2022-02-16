import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Login } from './models/login.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService) {}

  @Get('login')
  login(@Body() body: Login) {
    return this.authService.login(body.email, body.password)
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
