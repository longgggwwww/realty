import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(record: UserRecord) {
    const user = await this.usersService.create({
      profile: {
        name: record.displayName,
        phone: record.phoneNumber,
        email: record.email,
        emailVerified: record.emailVerified,
        avatar: record.photoURL,
      },
      providers: record.providerData.map((provider) => provider.providerId),
      disabled: record.disabled,
    });

    // Tạo tài khoản link vào người dùng mới
    // const account = await this.prismaService.account.create({
    //   data: {
    //     uid: record.uid,
    //     user: {
    //       connect: {
    //         id: user.id,
    //       },
    //     },
    //   },
    //   include: {
    //     user: true,
    //   },
    // });

    // return account;
  }

  async findByUID(uid: string) {
    return await this.prismaService.account.findUnique({
      where: {
        uid,
      },
      include: {
        user: true,
      },
    });
  }
}
