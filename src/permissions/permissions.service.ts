import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { DeletePermissionDto } from './dto/delete-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    return await this.prismaService.permission.create({
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
    return this.prismaService.permission.findMany({
      include: {
        group: true,
        roles: true,
        users: true,
      },
    });
  }

  async findOne(id: string) {
    const permission = await this.prismaService.permission.findUnique({
      where: {
        id,
      },
    });
    if (!permission) {
      throw new NotFoundException();
    }

    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return await this.prismaService.permission.update({
      where: {
        id,
      },
      data: {
        code: updatePermissionDto.code,
        description: updatePermissionDto.description,
        group: updatePermissionDto.groupId
          ? {
              connect: {
                id: updatePermissionDto.groupId,
              },
            }
          : undefined,
      },
      include: {
        group: true,
        roles: true,
        users: true,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.permission.delete({
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

  async removeBatch(deletePermissionDto: DeletePermissionDto) {
    return await this.prismaService.permission.deleteMany({
      where: {
        id: {
          in: deletePermissionDto.ids,
        },
      },
    });
  }
}
