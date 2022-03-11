import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetJwt } from 'src/auth/jwt.decorator';
import { User } from './entities/user.model';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('friend')
  createFriend(@GetJwt() user: User, @Body() body: any) {
    return this.usersService.createFriend(user.id, body.idFriend);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Get('auth/me')
  findMe(@GetJwt() user: User) {
    return this.usersService.findMe(user);
  }
  @Get('me/friends/')
  findFriends(@GetJwt() user: User) {
    return this.usersService.findFriends(user.id);
  }
  @Patch()
  update(@GetJwt() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
