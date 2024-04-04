import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User_I } from './interfaces/User';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/CreateUserDto';
import { hashPassword } from 'src/service/hashPassword';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { compareUser } from 'src/service/comparePassword';

@Injectable()
export class UserService {
  private readonly users: User_I[] = [];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async create(data: CreateUserDto) {
    const newUser: User_I = {
      id: randomUUID(),
      login: data.login,
      password: await hashPassword(data.password),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: process.env.version,
    };
    this.users.push(newUser);
  }

  async updateUserPassword(id: string, updateDto: UpdateUserDto) {
    const indexOfUser = this.users.findIndex((v) => v.id === id);
    if (indexOfUser === -1) throw new NotFoundException();
    if (
      await compareUser(updateDto.oldPassword, this.users[indexOfUser].password)
    ) {
      this.users[indexOfUser].password = await hashPassword(
        updateDto.newPassword,
      );
      return true;
    } else {
      throw new ForbiddenException();
    }
  }

  delete(id: string) {
    const indexOfUser = this.users.findIndex((v) => v.id === id);
    if (indexOfUser > -1) {
      this.users.splice(indexOfUser, 1);
      return true;
    }
    return false;
  }
}
