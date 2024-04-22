// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async sendMessage(createMessageDto: { sender: string; message: string }): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    await createdMessage.save();
    return createdMessage;
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}