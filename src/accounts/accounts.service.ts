import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService, private user: UsersService) {}

  async create(record: UserRecord) {
    const user = await this.user.create({
      profile: {
        name: record.displayName,
        phone: record.phoneNumber,
        email: record.email,
        emailVerified: record.emailVerified,
        avatar: record.photoURL,
      },
      disabled: record.disabled,
    });

    // Tạo tài khoản link vào người dùng mới
    const account = await this.prisma.account.create({
      data: {
        uid: record.uid,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return account;
  }

  async findByUID(uid: string) {
    return await this.prisma.account.findFirst({
      where: {
        uid,
      },
      include: {
        user: true,
      },
    });
  }
}
