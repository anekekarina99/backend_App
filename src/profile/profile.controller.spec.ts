import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AppResponse } from 'src/response.base';
import { Response } from 'express';

describe('ProfileController', () => {
  let profileController: ProfileController;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        {
          provide: 'PROFILE_MODEL',
          useValue: {},
        },
      ],
    }).compile();

    profileController = module.get<ProfileController>(ProfileController);
    profileService = module.get<ProfileService>(ProfileService);
  });

  
  /*describe('createProfile', () => {
    it('should call ProfileService.createProfile and return a success response', async () => {
      const createProfileDto: CreateProfileDto = {
        name: 'Test User',
        age: 30,
        gender: 'Male',
      };
      const id = '12345';
      const newProfile = { id: '12345', ...createProfileDto };
      jest.spyOn(profileService, 'createProfile').mockResolvedValue(newProfile);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await profileController.createProfile(createProfileDto, id, res);

      expect(profileService.createProfile).toHaveBeenCalledWith(createProfileDto, id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Profile created successfully',
        data: newProfile,
      });
    });

    it('should return a bad request response when ProfileService.createProfile throws an error', async () => {
      const createProfileDto: CreateProfileDto = {
        name: 'Test User',
        age: 30,
        gender: 'Male',
      };
      const id = '12345';
      const errorMessage = 'Failed to create profile';
      jest.spyOn(profileService, 'createProfile').mockRejectedValue(new Error(errorMessage));

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await profileController.createProfile(createProfileDto, id, res);

      expect(profileService.createProfile).toHaveBeenCalledWith(createProfileDto, id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        message: errorMessage,
        data: {},
      });
    });
  });

  describe('getProfile', () => {
    it('should call ProfileService.getProfile and return a success response', async () => {
      const id = '12345';
      const profile = { id, name: 'Test User', age: 30, gender: 'Male' };
      jest.spyOn(profileService, 'getProfile').mockResolvedValue(profile);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await profileController.getProfile(id, res);

      expect(profileService.getProfile).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Profile retrieved successfully',
        data: profile,
      });
    });

    it('should return a badrequest response when ProfileService.getProfile throws an error', async () => {
      const id = '12345';
      const errorMessage = 'Profile not found';
      jest.spyOn(profileService, 'getProfile').mockRejectedValue(new Error(errorMessage));

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await profileController.getProfile(id, res);

      expect(profileService.getProfile).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        message: errorMessage,
        data: {},
      });
    });
  });

  describe('updateProfile', () => {
    it('should call ProfileService.updateProfile and return a success response', async () => {
      const id = '12345';
      const updateProfileDto: UpdateProfileDto = {
        name: 'Updated User',
        age: 35,
        gender: 'Female',
      };
      const updatedProfile = { id, ...updateProfileDto };
      jest.spyOn(profileService, 'updateProfile').mockResolvedValue(updatedProfile);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await profileController.updateProfile(id, updateProfileDto, res);

      expect(profileService.updateProfile).toHaveBeenCalledWith(id, updateProfileDto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Profile updated successfully',
        data: updatedProfile,
      });
    });

    it('should return a bad request response when ProfileService.updateProfile throws an error', async () => {
      const id = '12345';
      const updateProfileDto: UpdateProfileDto = {
        name: 'Updated User',
        age: 35,
        gender: 'Female',
      };
      const errorMessage = 'Failed to update profile';
      jest.spyOn(profileService, 'updateProfile').mockRejectedValue(new Error(errorMessage));

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await profileController.updateProfile(id, updateProfileDto, res);

      expect(profileService.updateProfile).toHaveBeenCalledWith(id, updateProfileDto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        message: errorMessage,
        data: {},
      });
    });
  });*/
});