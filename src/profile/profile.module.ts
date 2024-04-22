import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileSchema } from './schemas/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
