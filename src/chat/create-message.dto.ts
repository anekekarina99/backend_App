// src/messages/dto/create-message.dto.ts
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  sender: string;

  @IsString()
  message: string;
}