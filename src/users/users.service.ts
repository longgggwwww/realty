import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // return await this.prismaService.user.create({
    //   data: {
    //     profile: {
    //       name: createUserDto.profile.name,
    //       dob: createUserDto.profile.dob,
    //       gender: createUserDto.profile.gender,
    //       about: createUserDto.profile.about,
    //       phone: createUserDto.profile.phone,
    //       email: createUserDto.profile.email,
    //       emailVerified: createUserDto.profile.emailVerified,
    //       address: {
    //         provide: createUserDto.profile.address.provider,
    //         district: createUserDto.profile.address.district,
    //         ward: createUserDto.profile.address.ward,
    //       },
    //     },
    //     providers: createUserDto.providers,
    //     disabled: createUserDto.disabled,
    //   },
    // });
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
    return await this.prismaService.user.findFirst();
  }

  async findOne(id: string) {
    return await this.prismaService.user.findMany({});
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
