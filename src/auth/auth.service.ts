import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectFirebaseAdmin() private readonly firebaseService: FirebaseAdmin,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const decodedIdToken = await this.firebaseService.auth.verifyIdToken(
        loginDto.token,
      );
      const [user, userRecord] = await Promise.all([
        this.usersService.findByUID(decodedIdToken.uid),
        this.firebaseService.auth.getUser(decodedIdToken.uid),
      ]);
      if (!user) {
        const user = await this.usersService.create({
          name: userRecord.displayName,
          avatar: userRecord.photoURL,
          phone: userRecord.phoneNumber,
          email: userRecord.email,
          emailVerified: userRecord.emailVerified,
          disabled: userRecord.disabled,
          accounts: [
            {
              uid: userRecord.uid,
              provider: userRecord.providerData[0].providerId,
            },
          ],
        });

        return {
          user,
          accessToken: await this.generateToken(user),
        };
      }

      return {
        user,
        accessToken: await this.generateToken(user),
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async generateToken(user: User) {
    return await this.jwtService.signAsync({
      id: user.id,
    });
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    console.log('debug:', refreshTokenDto);
    console.log('refresh token!');
  }
}
