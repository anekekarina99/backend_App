// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ClientSession, ObjectId } from 'mongodb';
import { AnyObject, Connection, Document, DocumentSetOptions, Error, FlattenMaps, MergeType, Model, PopulateOptions, Query, QueryOptions, Require_id, SaveOptions, ToObjectOptions, Types, UpdateQuery, UpdateWithAggregationPipeline, pathsToSkip } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let userModelMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModelMock = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

 /* describe('create', () => {
    it('should create a new user with hashed password', async () => {
      let ids = new Types.ObjectId()
      const _ccreateUserDto = {
        email: 'test@example.com',
        password: '123456',
        _id: ids,
        createdAt: new Date(),
      };

      const savedUser = { ..._ccreateUserDto };
      userModelMock.create.mockResolvedValue(savedUser);
      //bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

      //const c : CreateUserDto = { ..._ccreateUserDto}
      const result = await service.create(c);

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 12);
      expect(userModelMock.create).toHaveBeenCalledWith({ ...createUserDto, password: 'hashedPassword' });
      expect(result).toEqual(savedUser);
    });
  });
*/

  // Additional tests will be added here

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ email: 'test@example.com', password: 'hashedPassword', id: '1' }];
      userModelMock.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(userModelMock.find).toHaveBeenCalled();
    });

    it('should return a message if no users found', async () => {
      userModelMock.find.mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual('No users found in the database.');
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { email: 'test@example.com', password: 'hashedPassword', id: '1' };
      userModelMock.findOne.mockResolvedValue(user);

      const result = await service.findOne('1');
      expect(result).toEqual(user);
      expect(userModelMock.findOne).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw an error if no user found', async () => {
      userModelMock.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow('Data not found!');
    });
  });

});
