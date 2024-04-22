// src/chat/chat.controller.ts
import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './message.schema';

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('sendMessage')
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(@Body() createMessageDto: { sender: string; message: string }): Promise<Message> {
    return this.chatService.sendMessage(createMessageDto);
  }

  @Get('messages')
  async getAllMessages(): Promise<Message[]> {
    return this.chatService.getAllMessages();
  }
}