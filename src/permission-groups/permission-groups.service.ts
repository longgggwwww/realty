import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { DeletePermissionGroupDto } from './dto/delete-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';

@Injectable()
export class PermissionGroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPermissionGroupDto: CreatePermissionGroupDto) {
    return await this.prismaService.permissionGroup.create({
      data: {
        name: createPermissionGroupDto.name,
        description: createPermissionGroupDto.description,
      },
    });
  }

  async findAll() {
    return await this.prismaService.permissionGroup.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.permissionGroup.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  async update(id: string, updatePermissionGroupDto: UpdatePermissionGroupDto) {
    return await this.prismaService.permissionGroup.update({
      where: {
        id,
      },
      data: {
        name: updatePermissionGroupDto.name,
        description: updatePermissionGroupDto.description,
      },
      include: {
        permissions: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.permissionGroup.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deletePermissionGroupDto: DeletePermissionGroupDto) {
    return await this.prismaService.permissionGroup.deleteMany({
      where: {
        id: {
          in: deletePermissionGroupDto.ids,
        },
      },
    });
  }
}
