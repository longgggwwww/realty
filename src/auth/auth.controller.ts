import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly account: AccountsService,
    private readonly firebase: FirebaseService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // try {
    //   const user = await this.firebase.getUser(loginDto.token);
    //   // Tạo tài khoản nếu là người dùng mới
    //   let account = await this.account.findByUID(user.uid);
    //   if (!account) {
    //     account = await this.account.create(user);
    //   }
    //   // Tạo token (cái này khác Firebase token, chỉ dùng cho API)
    //   const token = this.auth.generateToken({ id: account.userId });
    //   return {
    //     user: account,
    //     token,
    //   };
    // } catch (err) {
    //   console.log(err);
    //   throw new UnauthorizedException(err);
    // }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.auth.generateToken({ id: refreshTokenDto.token });
  }
}
