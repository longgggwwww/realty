import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateRoleDto } from './dto/create-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.prismaService.role.create({
      data: {
        name: createRoleDto.name,
        level: createRoleDto.level,
        description: createRoleDto.description,
        permissions: {
          connect: createRoleDto.permissionIds.map((id) => ({ id })),
        },
      },
      include: {
        permissions: true,
        users: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.role.findMany({
      include: {
        permissions: true,
        users: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.role.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        permissions: true,
        users: true,
      },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.prismaService.role.update({
      where: {
        id,
      },
      data: {
        name: updateRoleDto.name,
        level: updateRoleDto.level,
        description: updateRoleDto.description,
        permissions: updateRoleDto.permissionIds
          ? {
              connect: updateRoleDto.permissionIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        permissions: true,
        users: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.role.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(deleteRoleDto: DeleteRoleDto) {
    return await this.prismaService.role.deleteMany({
      where: {
        id: {
          in: deleteRoleDto.ids,
        },
      },
    });
  }
}
