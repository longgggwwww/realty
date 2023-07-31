import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: {
        code: createPermissionDto.code,
        description: createPermissionDto.description,
        group: {
          connect: {
            id: createPermissionDto.groupId,
          },
        },
      },
      include: {
        group: true,
        roles: true,
        users: true,
      },
    });
  }

  async findAll() {
    return this.prisma.permission.findMany({
      include: {
        group: true,
        roles: true,
        users: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.permission.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return this.prisma.permission.update({
      where: {
        id,
      },
      data: {
        code: updatePermissionDto.code,
        description: updatePermissionDto.description,
        group: {
          connect: {
            id: updatePermissionDto.groupId,
          },
        },
      },
      include: {
        group: true,
        roles: true,
        users: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.permission.delete({
      where: {
        id,
      },
      include: {
        group: true,
        roles: true,
        users: true,
      },
    });
  }
}
