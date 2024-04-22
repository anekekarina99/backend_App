import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { LocalStrategy } from "./local.auth";
import { UserSchema } from "src/user/schemas/user.schema";
import { UserModule } from "src/user/users.module";
import { UserService } from "src/user/users.service";

@Module({
  imports: [PassportModule],
  providers: [UserService, LocalStrategy],
  exports: [UserService],
})
export class AuthModule {}