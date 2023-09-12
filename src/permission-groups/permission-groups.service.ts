import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { DeletePermissionGroupDto } from './dto/delete-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';

@Injectable()
export class PermissionGroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPermissionGroupDto: CreatePermissionGroupDto) {
    return await this.prismaService.permGroup.create({
      data: {
        name: createPermissionGroupDto.name,
        description: createPermissionGroupDto.description,
      },
    });
  }

  async findAll() {
    return await this.prismaService.permGroup.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.permGroup.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  async update(id: string, updatePermissionGroupDto: UpdatePermissionGroupDto) {
    return await this.prismaService.permGroup.update({
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
    return await this.prismaService.permGroup.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deletePermissionsGroupDto: DeletePermissionGroupDto) {
    return await this.prismaService.permGroup.deleteMany({
      where: {
        id: {
          in: deletePermissionsGroupDto.ids,
        },
      },
    });
  }
}
