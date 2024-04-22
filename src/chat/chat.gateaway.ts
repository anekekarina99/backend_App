// src/chat.gateway.ts
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { sender: string; message: string }): Promise<void> {
    const message = await this.chatService.sendMessage(data);
    this.server.emit('viewMessage', message);
  }

  @SubscribeMessage('viewMessage')
  async handleViewMessage(): Promise<void> {
    const messages = await this.chatService.getAllMessages();
    this.server.emit('allMessages', messages);
  }
}