import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: any) {
    console.log('creating...', createUserDto);
    const test = '6462f91915a1a416a2854cb1';
    return await this.prismaService.user.create({
      data: {
        auth_time: 'hello world',
        // profile: {
        //   full_name: createUserDto.profile.fullName,
        //   gender: createUserDto.profile.gender,
        //   dob: createUserDto.profile.dob,
        //   about: createUserDto.profile.bio,
        //   address: {
        //     provide: createUserDto.profile.address.provide,
        //     district: createUserDto.profile.address.district,
        //     ward: createUserDto.profile.address.ward,
        //   },
        //   avatar: createUserDto.profile.avatar,
        //   background: createUserDto.profile.background,
        // },
        // auth_time: new Date(createUserDto.authTime),
        // is_active: createUserDto.isActive,
      },
    });
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
