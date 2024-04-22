import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: 'USER_MODEL',
          useValue: {},
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  
  /*describe('login', () => {
    it('should call AuthService.validateUser and JwtService.sign with correct values', async () => {
      const email = 'test@example.com';
      const password = 'testPassword';
      const user = { id: 1, email, password };
      const payload = { email, sub: user.id };
      const token = 'testToken';

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      await authController.login({ email, password });

      expect(authService.validateUser).toHaveBeenCalledWith(email, password);
      expect(jwtService.sign).toHaveBeenCalledWith(payload, { secret: process.env.JWT_SECRET });
    });

    it('should return an access token when login is successful', async () => {
      const email = 'test@example.com';
      const password = 'testPassword';
      const user = { id: 1, email, password };
      const payload = { email, sub: user.id };
      const token = 'testToken';

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authController.login({ email, password });

      expect(result).toEqual({ access_token: token });
    });
  });*/
});