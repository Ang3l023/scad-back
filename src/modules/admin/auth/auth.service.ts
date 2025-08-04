import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../../database/repositories/user.repository';
import { IPayloadJwt } from './../../../common/interfaces/payload-jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtSercie: JwtService,
  ) {}

  async singIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.isPassword(password)) {
      throw new UnauthorizedException();
    }

    const payload: IPayloadJwt = { id: user.id, email, role: user.role };

    return {
      access_token: await this.jwtSercie.signAsync(payload),
    };
  }
}
