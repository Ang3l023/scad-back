import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../../../database/repositories/user.repository';
import { FindAllOptions } from 'src/database/repositories/base.repository';
import { User } from '../../../database/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findAll(options: FindAllOptions<User>) {
    return await this.userRepository.findAll(options);
  }

  async findOne(cid: string): Promise<User | null> {
    const user = await this.userRepository.findByCid(cid);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async updateOne(
    cid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.findOne(cid);

    const updatedUser = await this.userRepository.updateOneById(
      user!.id,
      updateUserDto,
    );

    return updatedUser;
  }

  async delete(cid: string): Promise<void> {
    const user = await this.findOne(cid);

    await this.userRepository.softDelete(user!.id);
  }
}
