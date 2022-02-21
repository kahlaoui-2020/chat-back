import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DiscussionEntity } from './entities/discussion.entity';
import { MessageEntity } from './entities/message.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RoomEntity } from './entities/room.entity';


@Module({
  imports: [
    UsersModule, 
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.MYSQL_URL,
      "port": parseInt(process.env.MYSQL_PORT),
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSWORD,
      "database": process.env.MYSQL_DB,
      "entities": [UserEntity, RoomEntity, MessageEntity],
      "synchronize": true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
