import { ChatGateway } from './chat.gateway';
import { AuthModule } from './auth/auth.module';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MessageEntity } from './entities/message.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RoomEntity } from './entities/room.entity';
import { RoomsModule } from './rooms/rooms.module';
import { FriendsEntity } from './entities/friends.entity';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [
    UsersModule,
    AuthModule,
    RoomsModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.MYSQL_URL,
      "port": parseInt(process.env.MYSQL_PORT),
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSWORD,
      "database": process.env.MYSQL_DB,
      "entities": [UserEntity, RoomEntity, MessageEntity, FriendsEntity],
      "synchronize": true
    }),
    CacheModule.register({
      ttl: 3600
    }),
    MessagesModule
  ],
  controllers: [AppController],
  providers: [
    ChatGateway, AppService],
})
export class AppModule { }
