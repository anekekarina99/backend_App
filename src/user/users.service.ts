import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserTransformer } from './transformers/user.transformer';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/auth/login.dto';
import { Payload } from 'src/types/payload';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<IUser>) { }

  async create(createUserDto: CreateUserDto): Promise<UserTransformer> {
    let data = new this.UserModel(createUserDto)

    const saltOrRounds = 12;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    data.password = hash
    if (!data) {
      throw new Error('Data not found must fill');
    }
    return UserTransformer.singleTransform(await data.save())
  }

  async findAll(): Promise<UserTransformer[] | string> {
    // Fetch all users from the database
    const users = await this.UserModel.find();

    // Check if any users were found
    if (users.length > 0) {
      // If users exist, apply transformations and return
      const transformedUsers = users.map((user) => UserTransformer.singleTransform(user));
      return transformedUsers;
    } else {
      // If no users exist, return a message indicating no users found
      return 'No users found in the database.';
    }
  }

  async findOne(id: string): Promise<UserTransformer> {
    let data = await this.UserModel.findOne({ id: id })
    if (!data) {
      throw new Error('Data not found!')
    }
    return UserTransformer.singleTransform(data)

  }
  async findOneByEmail(email: string): Promise<UserTransformer> {
    let data = await this.UserModel.findOne({ email: email })
    if (!data) {
      throw new Error('Data not found!')
    }
    return UserTransformer.singleTransform(data)
  }
  async findOneByEmailObject(email: string): Promise<IUser> {
    let data = await this.UserModel.findOne({ email: email })
    if (!data) {
      throw new Error('User not found!')
    }
    return data
  }

  async findOneById(idx: string): Promise<IUser> {
    let data = await this.UserModel.findOne({ id : idx });

    if (!data) {
      throw new Error('User not found!')
    }
    return data;
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<UserTransformer> {
    // Menggunakan findByEmail untuk mencari pengguna berdasarkan email
    const user = await this.UserModel.findByIdAndUpdate(email);

    if (!user) {
      throw new Error('User not found');
    }

    // Memperbarui pengguna dengan data baru
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    // Menyimpan perubahan ke database
    const updatedUser = await user.save();

    return updatedUser;
  }
  async remove(emaile: string): Promise<IUser> {
    let data = await this.UserModel.findOne({ email: emaile })
    if (!data) {
      throw new Error('User not found!')
    }
    return this.UserModel.findByIdAndDelete(emaile).exec();
  }


  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user.email)
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async sanitizeUser(email: string): Promise<IUser> {
    const sanitized = await this.UserModel.findOne({ email });
    delete sanitized['password'];
    return sanitized.toObject();
  }

  async getUser(query: object): Promise<User> {
    return this.UserModel.findOne(query);
  }

}





