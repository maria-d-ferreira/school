import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CreateUserRequest } from './dto/create-user-request.dto';
import { UserResponse } from './dto/user-response.dto';
import { UsersService } from './users.service';

import { Serialize } from '../interceptors/serialize.interceptor';
import { UpdateUser } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserDto } from './dto/user.dto';

//  @UseGuards(JwtAuthGuard)

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup/teacher')
  async createTeacher(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.createTeacher(createUserRequest);
  }

  @Post('/signup/student')
  async createStudent(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.createStudent(createUserRequest);
  }

  @Get('/users')
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }

  @Get('/teachers')
  async getTeachers(): Promise<any> {
    return this.usersService.getTeachers();
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch('/user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUser) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/user/:id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  @Get()
  async getUser(@CurrentUser() user: UserResponse): Promise<UserResponse> {
    return user;
  }
}
