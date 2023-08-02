import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { DeletePermissionsDto } from './dto/delete-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: createPermissionDto,
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
      data: updatePermissionDto,
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

  async removeBatch(deletePermissionsDto: DeletePermissionsDto) {
    return await this.prisma.permission.deleteMany({
      where: {
        id: {
          in: deletePermissionsDto.ids,
        },
      },
    });
  }
}
