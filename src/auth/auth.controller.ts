import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadGatewayException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { auth } from 'firebase-admin';
import { PrismaService } from 'src/prisma/prisma.service';
// import { EmbedBuilder, WebhookClient } from 'discord.js';

// kết nối discord webhook
// const webhookClient = new WebhookClient({
//   url: 'https://discord.com/api/webhooks/1131780591524773969/C969uE7xlTDZlfiKBtEkYb73I61t4-4bU4iiAIc2patvoasD7dtt4P557blkxUd7ROSi',
// });

// const embed = new EmbedBuilder().setTitle('Some Title').setColor(0x00ffff);

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // webhookClient.send({
    //   content: `Đang test login với body: ${JSON.stringify(loginDto)}`,
    //   username: 'login',
    //   avatarURL: 'https://i.imgur.com/AfFp7pu.png',
    //   embeds: [embed],
    // });

    try {
      // Xác thực token với firebase-admin
      const decoded = await auth().verifyIdToken(loginDto.token);

      // Tạo tài khoản nếu là người dùng mới
      const user = await this.authService.getOrCreateUser(decoded);
      console.log('get user:', user);

      // Tạo token (dành riêng cho hệ thống)
      const token = await this.authService.generateToken(user as any);

      return {
        user,
        token,
      };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(err);
    }
  }

  @Post('regist')
  async regist(@Body() data: any) {
    try {
      // Kiểm tra
    } catch (err) {
      console.log(err);
      throw new BadGatewayException(err);
    }
  }

  @Post()
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    // return this.authService.generateToken(refreshTokenDto.token);
  }
}
