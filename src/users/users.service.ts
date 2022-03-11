import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { FriendsEntity } from 'src/entities/friends.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Connection, DeleteResult, getManager, getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.model';

@Injectable()
export class UsersService {
  

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FriendsEntity)
    private friendsRepository: Repository<FriendsEntity>
    ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto)
    const userObject = await this.userRepository.save(user);
    const {password, ...result} = userObject
    return result;
  }
  async createFriend(id: string, idFriend: string): Promise<any>{
    const friend = await this.friendsRepository.create({userI: id, userII: idFriend})
    const result = await this.friendsRepository.save(friend)
    return result;
  }
  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user =  await this.userRepository.update(id, updateUserDto);
    return user.affected; 
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
  async findFriends(id: string): Promise<any[]> {
    const ids: any = getManager().createQueryBuilder(FriendsEntity, 'friend')
    .select(
      `CASE
        WHEN userI = '${id}' THEN userII
        WHEN userII = '${id}' THEN userI
        END`, 'id')
    .having('id is not null');
    const result =  this.userRepository.createQueryBuilder('user')
        .select(['user.lastName as lastName', 'user.firstName as firstName'])
        .innerJoinAndSelect('('+ids.getQuery()+')', 'friend', 'friend.id = user.id')
        .addSelect('friend.id')
        .getRawMany();
    return result;
  }

  // async findFriendsId(id: string): Promise<string[]> {
  //   const ids: string[] = this.friendsRepository.find({})
  // }
}
