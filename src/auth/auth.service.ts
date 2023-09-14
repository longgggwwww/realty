import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
    @InjectFirebaseAdmin() private readonly firebaseService: FirebaseAdmin,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const decodedIdToken = await this.firebaseService.auth.verifyIdToken(
        loginDto.token,
      );
      const [account, userRecord] = await Promise.all([
        this.accountsService.findUnique(decodedIdToken.uid),
        this.firebaseService.auth.getUser(decodedIdToken.uid),
      ]);
      if (!account) {
        const user = await this.usersService.create({
          name: userRecord.displayName,
          avatar: userRecord.photoURL,
          phone: userRecord.phoneNumber,
          email: userRecord.email,
          emailVerified: userRecord.emailVerified,
          disabled: userRecord.disabled,
        });
        const account = await this.accountsService.create({
          uid: userRecord.uid,
          userId: user.id,
          provider: userRecord.providerData[0].providerId,
        });
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  generateToken(refreshTokenDto: RefreshTokenDto) {
    return 'hello world';
  }
}
