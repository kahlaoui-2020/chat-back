import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.model';

@Injectable()
export class UsersService {
  

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
    ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto)
    const userObject = await this.userRepository.save(user);
    const {password, ...result} = userObject
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<DeleteResult> {
   return await this.userRepository.delete(id)
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({where: {email: email}, select: ['id', 'password']})
  }

  async findMe(user: User): Promise<User> {
    return await this.userRepository.findOne({where: {id: user.id}})
  }
}
