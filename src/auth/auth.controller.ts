import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,

  ) { }

  @UseGuards(AuthGuard('local'))
  //@UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() credentials: { email: string, password: string }) {
    return this.authService.login(credentials.email, credentials.password);
  }
}