import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  controllers: [RoomsController],
  imports: [TypeOrmModule.forFeature([UserEntity, RoomEntity])],
  exports: [TypeOrmModule, RoomsService],
  providers: [RoomsService]
})
export class RoomsModule {}
