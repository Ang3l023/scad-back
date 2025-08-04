import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../../../database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create({
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync()),
      cid: uuidV4(),
    });
  }
}
