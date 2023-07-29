import { Injectable } from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionGroupsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.prismaService.permissionGroup.create({
      data: {
        name: createPermissionGroupDto.name,
      },
    });
  }

  async findAll() {
    return this.prismaService.permissionGroup.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.permissionGroup.findUnique({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  async update(id: string, updatePermissionGroupDto: UpdatePermissionGroupDto) {
    return this.prismaService.permissionGroup.update({
      where: {
        id,
      },
      data: {
        name: updatePermissionGroupDto.name,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.permissionGroup.delete({
      where: {
        id,
      },
    });
  }
}
