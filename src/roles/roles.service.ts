import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.prisma.role.create({
      data: {
        name: createRoleDto.name,
        level: createRoleDto.level,
        permissions: {
          connect: createRoleDto.permissionIds.map((id) => ({ id })),
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.role.findUnique({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name: updateRoleDto.name,
        level: updateRoleDto.level,
        permissions: {
          connect: updateRoleDto.permissionIds.map((id) => ({ id })),
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.role.delete({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }
}
