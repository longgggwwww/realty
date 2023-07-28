import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CreateGroupDto } from './dto/group/create-group.dto';
import { UpdateGroupDto } from './dto/group/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    return await this.prisma.permissionGroup.create({
      data: {
        name: createGroupDto.name,
      },
    });
  }

  async findAllGroup() {
    return this.prisma.permissionGroup.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOneGroup(id: string) {
    return this.prisma.permissionGroup.findUnique({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  async updateGroup(id: string, updateGroupDto: UpdateGroupDto) {
    return this.prisma.permissionGroup.update({
      where: {
        id,
      },
      data: {
        name: updateGroupDto.name,
      },
      include: {
        permissions: true,
      },
    });
  }

  async removeGroup(id: string) {
    return this.prisma.permissionGroup.delete({
      where: {
        id,
      },
    });
  }

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
      },
    });
  }

  async findAll() {
    return this.prisma.permission.findMany({
      include: {
        group: true,
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
    });
  }

  async remove(id: string) {
    return this.prisma.permission.delete({
      where: {
        id,
      },
    });
  }
}
