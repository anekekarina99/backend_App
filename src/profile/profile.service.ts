import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfile } from './interfaces/profile.interface';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileTransformer } from './transformers/profile.transformer';
import { ZodiacSignLibrary } from './mod';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserModule } from 'src/user/users.module';
import { UserService } from 'src/user/users.service';



@Injectable()
export class ProfileService {
  private readonly userService: UserService;
  constructor(@InjectModel('Profile') private profileModel: Model<IProfile>) { }
  private readonly zodiacSigns: string[] = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  private readonly chineseZodiacSigns: string[] = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ];

  public getZodiacSign(birthDate: Date): string {
    if (isNaN(birthDate.getTime())) {
      throw new Error("Invalid birth date. Please provide a valid Date object.");
    }

    const month = birthDate.getMonth();
    const day = birthDate.getDate();

    if (month === 0) {
      return day >= 20 ? this.zodiacSigns[11] : this.zodiacSigns[0];
    } else {
      return this.zodiacSigns[month - 1];
    }
  }

  public getChineseZodiacSign(birthDate: Date): string {
    if (isNaN(birthDate.getTime())) {
      throw new Error("Invalid birth date. Please provide a valid Date object.");
    }

    const year = birthDate.getFullYear();
    const chineseYear = year - (year % 12);

    return this.chineseZodiacSigns[chineseYear % 12];
  }
  async createProfile(createProfileDto: CreateProfileDto, idx:string): Promise<ProfileTransformer> {
    // Menghitung horoscope menggunakan pustaka zodiac-signs
    let data = new this.profileModel(createProfileDto);

    data.id = idx;
    // Menetapkan horoscope ke createProfileDto
    const zodiacLibrary = new ZodiacSignLibrary();

    data.horoscope = zodiacLibrary.getZodiacSign(data.birthday);
    data.zodiac = zodiacLibrary.getChineseZodiacSign(data.birthday);
    // Membuat dan menyimpan profil baru dengan _id yang sama dengan userId

    // Menggunakan ProfileTransformer untuk mentransformasi data yang disimpan
    return ProfileTransformer.transform(await data.save());
  }

  async getProfile(id: string): Promise<ProfileTransformer> { // Mengubah tipe kembalian menjadi any atau tipe yang sesuai dengan hasil transformasi
    const profile = await this.profileModel.findById(id).exec();
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    // Menggunakan ProfileTransformer untuk mentransformasi profil yang ditemukan
    return ProfileTransformer.singleTransform(profile);
  }

  private limitAndChangeDesc(interests: string[], valueToUpdate: string, newDesc: string): string[] {
    // Limit the interests array to a maximum of 5 elements
    const limitedInterests = interests.slice(0, 5);

    // Update description for the matching value (if found)
    for (const interest of limitedInterests) {
      if (interest === valueToUpdate) {
        // Update the description for this specific interest
        const index = limitedInterests.indexOf(interest);
        limitedInterests[index] = newDesc;
        break; // Stop iterating after finding the match
      }
    }

    return limitedInterests;
  }
  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<ProfileTransformer> {
    let updatedProfile = await this.profileModel.findByIdAndUpdate(id, updateProfileDto, { new: true }).exec();
    if (!updatedProfile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    if (!updatedProfile.displayName) {
      throw new NotFoundException(`Profile display name not found`);
    }
    updatedProfile.displayName = updateProfileDto.displayName

    if (!updatedProfile.gender) {
      throw new NotFoundException(`Profile gender not found`)
    }

    updatedProfile.gender = updateProfileDto.gender

    if (!updateProfileDto.birthday) {
      throw new NotFoundException(`Profile birthday not found`)
    }

    updatedProfile.birthday = updateProfileDto.birthday


    // Menghitung horoscope jika birthday diperbarui
    const zodiacLibrary = new ZodiacSignLibrary();

    updatedProfile.horoscope = zodiacLibrary.getZodiacSign(updatedProfile.birthday);
    updatedProfile.zodiac = zodiacLibrary.getChineseZodiacSign(updatedProfile.birthday);
    updatedProfile.height = updateProfileDto.height
    updatedProfile.weight = updateProfileDto.weight

    // Memastikan interest tidak lebih dari 5 elemen
    const limitedInterests = this.limitAndChangeDesc(updateProfileDto.interest || [], 'valueToUpdate', 'newDesc');

    updatedProfile.interest = limitedInterests;
    updatedProfile.profilePictureURL = updateProfileDto.profilePictureURL

    //updateProfile
    const updtPr = await updatedProfile.save();
    // updatedProfile.
    return updtPr;
  }

}
