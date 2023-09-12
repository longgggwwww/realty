import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
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
  @Post('/refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.generateToken({ id: refreshTokenDto.token });
  }
}
