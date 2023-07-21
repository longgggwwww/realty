import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { JwtPayload } from './entities/jwt-payload.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getOrCreateUser(decoded: DecodedIdToken) {
    let user = await this.userService.findOne(decoded.uid);
    // Nếu là tải khoản mới => tạo tài khoản
    if (!user) {
      user = this.userService.create(decoded);
    }

    return user;
  }

  async generateToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload);
  }
}
