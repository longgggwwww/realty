import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.prismaService.role.create({
      data: createRoleDto,
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
    return await this.prismaService.role.findUnique({
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
      data: updateRoleDto,
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
