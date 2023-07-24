import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { JwtPayload } from './entities/jwt-payload.entity';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private firebaseAdminService: FirebaseAdminService,
    private jwtService: JwtService,
  ) {}

  async getUserFromFirebase(token: string) {
    const decoded = await this.firebaseAdminService
      .getAuth()
      .verifyIdToken(token);

    // Lấy thông tin người dùng từ token
    const credentials = await this.firebaseAdminService
      .getAuth()
      .getUser(decoded.uid);
    return credentials;
  }

  async getOrCreateUser(userRecord: UserRecord) {
    const account = await this.userService.findAccountByUID(userRecord.uid);

    // Nếu là tải khoản mới => tạo tài khoản
    if (!account) {
      const user = await this.userService.create({
        profile: {
          fullName: userRecord.displayName,
          email: userRecord.email,
          emailVerified: userRecord.emailVerified,
          avatar: userRecord.photoURL,
          background: userRecord.photoURL,
        },
        isActive: !userRecord.disabled,
      });

      console.log('go here', user);

      const account = await this.userService.createAccount({
        uid: userRecord.uid,
        providerIds: userRecord.providerData.map((data) => data.providerId),
        userId: user.id,
      });

      return account;
    }

    // return user;
  }

  async generateToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload);
  }
}
