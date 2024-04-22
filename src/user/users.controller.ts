import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { AppResponse } from 'src/response.base';

@Controller('api')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      let newUser = await this.userService.create(createUserDto);
      return AppResponse.ok(res, { user: newUser }, 'User successfully registered');
    } catch (error) {
      return AppResponse.badRequest(res, "", error.message);
    }
  }
}
