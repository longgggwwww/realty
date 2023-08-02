import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { DeletePermissionGroupsDto } from './dto/delete-permission-group.dto';

@Injectable()
export class PermissionGroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionGroupDto: CreatePermissionGroupDto) {
    return await this.prisma.permGroup.create({
      data: createPermissionGroupDto,
      include: {
        permissions: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.permGroup.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.permGroup.findUnique({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  async update(id: string, updatePermissionGroupDto: UpdatePermissionGroupDto) {
    return await this.prisma.permGroup.update({
      where: {
        id,
      },
      data: updatePermissionGroupDto,
      include: {
        permissions: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.permGroup.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deletePermissionsGroupDto: DeletePermissionGroupsDto) {
    return await this.prisma.permGroup.deleteMany({
      where: {
        id: {
          in: deletePermissionsGroupDto.ids,
        },
      },
    });
  }
}
