import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageEntity } from 'src/entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room.entity';

@Module({
  controllers: [MessagesController],
  imports: [TypeOrmModule.forFeature([MessageEntity, RoomEntity])],
  exports: [MessagesService],
  providers: [MessagesService]
})
export class MessagesModule {}
