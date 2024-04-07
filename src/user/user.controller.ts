import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UserService } from './user.service';
import { UUID } from 'crypto';
import { isUUID } from 'src/service/isUuid';

@Controller('user')
export class UserController {
  constructor(private userServer: UserService) {}

  @Get()
  getAllUsers() {
    return this.userServer.findAll();
  }

  @Get(':id')
  getSingleUser(@Param('id') id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);
    const user = this.userServer.findOne(id as UUID);

    if (user) return user;

    throw new NotFoundException();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.userServer.create(createUserDto);
  }

  @Put(':id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);

    await this.userServer.updateUserPassword(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  removeUser(@Param('id') id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`Id "${id}" is not UUID type`);

    if (this.userServer.delete(id)) return;
    throw new NotFoundException(`id "${id}" not found`);
  }
}
