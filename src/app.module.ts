import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DiscussionEntity } from './entities/discussion.entity';
import { MessageEntity } from './entities/message.entity';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    UsersModule, 
    AuthModule,
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.MYSQL_URL,
      "port": parseInt(process.env.MYSQL_PORT),
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSWORD,
      "database": process.env.MYSQL_DB,
      "entities": [UserEntity, DiscussionEntity, MessageEntity],
      "synchronize": true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
