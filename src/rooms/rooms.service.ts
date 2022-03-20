import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room.entity';
import { UserEntity } from 'src/entities/user.entity';
import { getManager, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {


  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>,
  @InjectRepository(RoomEntity)
  private roomRepository: Repository<RoomEntity>) {}

  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAll(id: string) {
    console.log(id)
    const ids: any = getManager().createQueryBuilder(RoomEntity, 'room')
    .select(
      `CASE
        WHEN userI = '${id}' THEN userII
        WHEN userII = '${id}' THEN userI
        END`, 'id').addSelect('id', 'roomId').addSelect('count', 'msgCount')
    .having('id is not null');
    const rooms = this.roomRepository
      .createQueryBuilder('room')
      .select(`CASE
      WHEN room.userI = '${id}' THEN userII
      WHEN room.userII = '${id}' THEN userI
      END`)
      .getQuery();
    const result =  this.userRepository.createQueryBuilder('user')
        .select(['user.lastName as lastName', 'user.firstName as firstName'])
        .innerJoinAndSelect('('+ids.getQuery()+')', 'room', 'room.id = user.id')
        .getRawMany();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

}
