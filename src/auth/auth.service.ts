import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './entities/jwt-payload.entity';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  generateToken(payload: JwtPayload) {
    return this.jwt.sign(payload);
  }
}
