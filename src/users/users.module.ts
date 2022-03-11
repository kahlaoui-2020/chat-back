import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { FriendsEntity } from 'src/entities/friends.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity, FriendsEntity])],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService]
})
export class UsersModule {}
