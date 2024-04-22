import { Controller, Post, Get, Put, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AppResponse } from 'src/response.base';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
// Pastikan Anda mengimpor AppResponse

@Controller('api')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  async createProfile(@Body() createProfileDto: CreateProfileDto, id: string, @Res() res: Response) {
    try {
      const newProfile = await this.profileService.createProfile(createProfileDto, id);
      return AppResponse.ok(res, newProfile, 'Profile created successfully');
    } catch (error) {
      return AppResponse.badRequest(res, {}, error.message);
    }
  }

  @Get('getProfile/:id')
  async getProfile(@Param('_id') id: string, @Res() res: Response) {
    try {
      const profile = await this.profileService.getProfile(id);
      return AppResponse.ok(res, profile, 'Profile retrieved successfully');
    } catch (error) {
      return AppResponse.badRequest(res, {}, 'Profile not found');
    }
  }

  @Put('updateProfile/:id')
  async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @Res() res: Response) {
    try {
      const updatedProfile = await this.profileService.updateProfile(id, updateProfileDto);
      return AppResponse.ok(res, updatedProfile, 'Profile updated successfully');
    } catch (error) {
      return AppResponse.badRequest(res, {}, 'Failed to update profile');
    }
  }
}
