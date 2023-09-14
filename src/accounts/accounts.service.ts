import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    return await this.prismaService.account.create({
      data: {
        uid: createAccountDto.uid,
        user: {
          connect: {
            id: createAccountDto.userId,
          },
        },
        provider: createAccountDto.provider,
      },
      include: {
        user: true,
      },
    });
  }

  async findUnique(uid: string) {
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
