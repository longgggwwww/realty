import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './entities/jwt-payload.entity';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async generateToken(payload: JwtPayload) {
    return await this.jwt.signAsync(payload);
  }
}
