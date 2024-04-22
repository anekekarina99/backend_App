// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateaway';
import { ChatService } from './chat.service';
import { Message, MessageSchema } from './message.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name :'Message', schema: MessageSchema }])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}