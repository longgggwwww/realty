import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        profile: {
          full_name: createUserDto.profile.fullName,
          gender: createUserDto.profile.gender,
          dob: createUserDto.profile.dob,
          about: createUserDto.profile.bio,
          address: {
            provide: createUserDto.profile.address.provide,
            district: createUserDto.profile.address.district,
            ward: createUserDto.profile.address.ward,
          },
          avatar: createUserDto.profile.avatar,
          background: createUserDto.profile.background,
        },
        is_active: createUserDto.isActive,
      },
    });
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    return await this.prismaService.account.create({
      data: {
        uid: createAccountDto.uid,
        providers: createAccountDto.providerIds,
        user: {
          connect: {
            id: createAccountDto.userId,
          },
        },
      },
    });
  }

  async findAccountByUID(uid: string) {
    const account = await this.prismaService.account.findUnique({
      where: {
        uid,
      },
      include: {
        user: true,
      },
    });

    return account;
  }

  async findAll() {
    console.log('find all ...');
    return await this.prismaService.user.findFirst();
  }

  async findOne(id: string) {
    console.log('debug:', id);
    return await this.prismaService.user.findMany({});

    // return await this.prismaService.user.findUnique({
    //   where: {
    //     id,
    //   },
    // });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
