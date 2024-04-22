// src/users/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AppResponse } from 'src/response.base';

describe('UsersController', () => {
  let controller: UsersController;
  let userServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Additional tests will be added here
  /*describe('register', () => {
  it('should register a new user and return a success response', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: '123456',
    };
    const result = { id: '1', email: 'test@example.com' };
    userServiceMock.create.mockResolvedValue(result);

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.register(createUserDto, responseMock as any);

    expect(userServiceMock.create).toHaveBeenCalledWith(createUserDto);
    expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(responseMock.json).toHaveBeenCalledWith({
      status: 'success',
      data: { user: result },
      message: 'User successfully registered',
    });
  });

  it('should return a bad request response when registration fails', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: '123456',
    };
    const errorMessage = 'Error registering user';
    userServiceMock.create.mockRejectedValue(new Error(errorMessage));

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.register(createUserDto, responseMock as any);

    expect(userServiceMock.create).toHaveBeenCalledWith(createUserDto);
    expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(responseMock.json).toHaveBeenCalledWith({
      status: 'error',
      data: "",
      message: errorMessage,
    });
  });
});
*/
});
