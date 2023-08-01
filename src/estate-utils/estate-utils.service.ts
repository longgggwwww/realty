import { Injectable } from '@nestjs/common';
import { CreateEstateUtilDto } from './dto/create-estate-util.dto';
import { UpdateEstateUtilDto } from './dto/update-estate-util.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstateUtilsService {
  constructor(private prisma: PrismaService) {}

  async create(createEstateUtilDto: CreateEstateUtilDto) {
    return await this.prisma.estateUtil.create({
      data: {
        title: createEstateUtilDto.title,
        icon: createEstateUtilDto.icon,
        estates: {
          connect: createEstateUtilDto.estateIds.map((id) => ({ id })),
        },
      },
      include: {
        estates: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.estateUtil.findMany({
      include: {
        estates: true,
        posts: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.estateUtil.findUnique({
      where: {
        id,
      },
      include: {
        estates: true,
        posts: true,
      },
    });
  }

  async update(id: string, updateEstateUtilDto: UpdateEstateUtilDto) {
    return await this.prisma.estateUtil.update({
      where: {
        id,
      },
      data: {
        title: updateEstateUtilDto.title,
        icon: updateEstateUtilDto.icon,
        estates: updateEstateUtilDto.estateIds
          ? {
              connect: updateEstateUtilDto.estateIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        estates: true,
        posts: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.estateUtil.delete({
      where: {
        id,
      },
    });
  }
}
