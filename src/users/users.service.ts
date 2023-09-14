import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        dob: createUserDto.dob,
        gender: createUserDto.gender,
        phone: createUserDto.phone,
        email: createUserDto.email,
        emailVerified: createUserDto.emailVerified,
        about: createUserDto.about,
        address: createUserDto.address,
        avatar: createUserDto.avatar,
        background: createUserDto.background,
        disabled: createUserDto.disabled,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      include: {
        accounts: true,
        role: true,
        permissions: true,
        posts: true,
        savedPosts: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        accounts: true,
        role: true,
        permissions: true,
        posts: true,
        savedPosts: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
        dob: updateUserDto.dob,
        gender: updateUserDto.gender,
        phone: updateUserDto.phone,
        email: updateUserDto.email,
        emailVerified: updateUserDto.emailVerified,
        about: updateUserDto.about,
        address: updateUserDto.address,
        avatar: updateUserDto.avatar,
        background: updateUserDto.background,
        disabled: updateUserDto.disabled,
      },
      include: {
        accounts: true,
        role: true,
        permissions: true,
        posts: true,
        savedPosts: true,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deleteUserDto: DeleteUserDto) {
    return this.prismaService.user.deleteMany({
      where: {
        id: {
          in: deleteUserDto.ids,
        },
      },
    });
  }
}
