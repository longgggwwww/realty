import { Injectable } from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionGroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionGroupDto: CreatePermissionGroupDto) {
    return await this.prisma.permissionGroup.create({
      data: {
        name: createPermissionGroupDto.name,
      },
      include: {
        permissions: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.permissionGroup.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.permissionGroup.findUnique({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  async update(id: string, updatePermissionGroupDto: UpdatePermissionGroupDto) {
    return await this.prisma.permissionGroup.update({
      where: {
        id,
      },
      data: {
        name: updatePermissionGroupDto.name,
      },
      include: {
        permissions: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.permissionGroup.delete({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }
}
