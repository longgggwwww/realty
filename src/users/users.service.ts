import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        profile: {
          name: createUserDto.profile.name,
          dob: createUserDto.profile.dob,
          gender: createUserDto.profile.gender,
          about: createUserDto.profile.about,
          phone: createUserDto.profile.phone,
          email: createUserDto.profile.email,
          emailVerified: createUserDto.profile.emailVerified,
          avatar: createUserDto.profile.avatar,
          background: createUserDto.profile.background,
        },
        disabled: createUserDto.disabled,
      },
    });
  }

  async findAccountByUID(uid: string) {
    const account = await this.prisma.account.findUnique({
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
    return await this.prisma.user.findFirst();
  }

  async findOne(id: string) {
    return await this.prisma.user.findMany({});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
