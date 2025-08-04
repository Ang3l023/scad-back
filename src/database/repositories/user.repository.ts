import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../schemas/user.schema';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByCid(cid: string): Promise<User> {
    const user = await this.repository.findOne({ where: { cid } });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario solicitado`);
    }

    return user;
  }
}
