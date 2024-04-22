
import { Injectable, NotAcceptableException } from '@nestjs/common';
//import { Payload } from '@nestjs/microservices';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { IUser } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthService {
 
  constructor( private readonly usersService: UserService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
      return user as IUser;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new NotAcceptableException('Invalid email or password');
    }
    const payload = { username: user.email, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

