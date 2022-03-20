import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {

  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,) {}
  
  async create(createMessageDto: CreateMessageDto) {
    console.log(createMessageDto)
    const message = this.messageRepository.create(createMessageDto);
    return await this.messageRepository.save(message);
  }

  async findAll(room: any) {
    const roomObj = this.roomRepository.create({id: room.id})
    const result = await this.messageRepository.find({
      where: {
        room: roomObj,
      
      },
      take: room.limit,
      skip: room.skip
    })
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}

