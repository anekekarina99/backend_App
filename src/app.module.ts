import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//import { UserModule } from './user/users.module';
//import { AuthModule } from './auth/auth.module';
//import { ProfileModule } from './profile/profile.module';
//import { ChatsModule } from './chat/chat.module';
//import { MessengerModule } from './messenger/messenger.module';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://db_hrs:a8LloB9SrseLJSBB@cluster0.hqt0mti.mongodb.net/db_hrs'),
    //UserModule,
    ChatModule,
    //AuthModule,
    //MessengerModule,
    //ProfileModule,
 
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsGateway],
})
export class AppModule { }
